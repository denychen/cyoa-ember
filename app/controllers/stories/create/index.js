import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  currentUser: Ember.inject.service('current-user'),
  
  maxTitleLength: 300,
  maxPremiseLength: 2000,
  genres: Ember.computed.readOnly('model'),

  titleLength: Ember.computed('title', function() {
    return this.get('maxTitleLength') - (this.get('title.length') || 0);
  }),

  premiseLength: Ember.computed('premise', function() {
    return this.get('maxPremiseLength') - (this.get('premise.length') || 0);
  }),

  actions: {
    createStory() {
      this.get('store').createRecord('story', {
        title: this.get('title'),
        description: this.get('premise'),
        authors: [this.get('currentUser.user')],
        genres: this.get('selectedGenres').map(genre => {
          return {
            id: genre.id,
            genre: genre.get('genre')
          };
        })
      }).save().then(story => {
        return this.transitionToRoute('stories.create.pages', story.id);
      });
    }
  }
});
