import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  currentUser: Ember.inject.service('current-user'),
  
  maxTitleLength: 300,
  maxPremiseLength: 2000,
  genres: Ember.computed.readOnly('model'),
  anyError: Ember.computed.or('missingTitle', 'missingGenre'),
  noErrors: Ember.computed.not('anyError'),

  titleLength: Ember.computed('title', function() {
    return this.get('maxTitleLength') - (this.get('title.length') || 0);
  }),

  premiseLength: Ember.computed('premise', function() {
    return this.get('maxPremiseLength') - (this.get('premise.length') || 0);
  }),

  actions: {
    createStory() {
      let title = this.get('title');
      let description = this.get('premise');
      let author = this.get('currentUser.user');
      let genres = this.get('selectedGenres');

      title ? this.set('missingTitle', false) : this.set('missingTitle', true);
      !Ember.isEmpty(genres) ? this.set('missingGenre', false) : this.set('missingGenre', true);
      
      if (this.get('noErrors')) {
        this.get('store').createRecord('story', {
          title: title,
          published: false,
          description: description,
          authors: [author],
          genres: genres.map(genre => {
            return {
              id: genre.id,
              genre: genre.get('genre')
            };
          })
        }).save().then(story => {
          return this.transitionToRoute('stories.create.story', story.id);
        });
      }
    }
  }
});
