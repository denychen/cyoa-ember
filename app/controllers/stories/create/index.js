import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  currentUser: Ember.inject.service('current-user'),

  genres: null,

  maxTitleLength: 150,
  maxPremiseLength: 1000,

  story: Ember.computed.readOnly('model.story'),
  title: Ember.computed.reads('story.title'),
  premise: Ember.computed.reads('story.description'),
  selectedGenres: Ember.computed.reads('initiallySelectedGenres'),
  initiallySelectedGenres: Ember.computed.filter('genres', function(genre) {
    let selectedGenres = this.get('story.genres');

    if (selectedGenres) {
      return this.get('story.genres').includes(genre.get('genre'));
    } else {
      return false;
    }
  }).property('genres.genre', 'story.genres'),
  
  anyError: Ember.computed.or('missingTitle', 'missingGenre'),
  noErrors: Ember.computed.not('anyError'),

  titleLength: Ember.computed('title', function() {
    return this.get('maxTitleLength') - (this.get('title.length') || 0);
  }),

  premiseLength: Ember.computed('premise', function() {
    return this.get('maxPremiseLength') - (this.get('premise.length') || 0);
  }),

  actions: {
    saveStory() {
      let title = this.get('title');
      let description = this.get('premise');
      let author = this.get('currentUser.user');
      let selectedGenres = this.get('selectedGenres');
      let published = this.get('story.published');

      title ? this.set('missingTitle', false) : this.set('missingTitle', true);
      !Ember.isEmpty(selectedGenres) ? this.set('missingGenre', false) : this.set('missingGenre', true);
      
      if (this.get('noErrors')) {
        let story = this.get('story');
        let genres = selectedGenres.map(genre => {
          return {
            id: genre.id,
            genre: genre.get('genre')
          };
        });

        story.set('title', title);
        story.set('description', description);
        story.set('authors', [author]);
        story.set('genres', genres);
        story.set('published', published);

        story.save().then(story => {
          return this.transitionToRoute('stories.create.story', story.id);
        });
      }
    }
  }
});
