import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  currentUser: Ember.inject.service('current-user'),

  emptyGenres: Ember.A(),
  genres: null,

  maxTitleLength: 150,
  maxPremiseLength: 1000,
  maxGenreCount: 3,

  maxGenreCountMet: Ember.computed('selectedGenresCount', 'maxGenreCount', function() {
    return this.get('selectedGenresCount') >= this.get('maxGenreCount');
  }),
  maxGenreCountMessage: Ember.computed('maxGenreCount', function() {
    return `Max ${this.get('maxGenreCount')} genres`;
  }),

  story: Ember.computed.readOnly('model.story'),
  title: Ember.computed.alias('story.title'),
  premise: Ember.computed.alias('story.description'),
  selectedGenresCount: Ember.computed.readOnly('selectedGenres.length'),
  selectedGenres: Ember.computed.reads('initiallySelectedGenres'),
  initiallySelectedGenres: Ember.computed.filter('genres', function(genre) {
    let selectedGenres = this.get('story.genres');

    if (selectedGenres) {
      return this.get('story.genres').map(genre => genre.id).includes(parseInt(genre.get('id')));
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
      let story = this.get('story');
      let author = this.get('currentUser.user');
      let selectedGenres = this.get('selectedGenres');

      story.get('title') ? this.set('missingTitle', false) : this.set('missingTitle', true);
      !Ember.isEmpty(selectedGenres) ? this.set('missingGenre', false) : this.set('missingGenre', true);
      
      if (this.get('noErrors')) {
        let genres = selectedGenres.map(genre => {
          return {
            id: genre.id,
            genre: genre.get('genre')
          };
        });

        story.set('authors', [author]);
        story.set('genres', genres);

        story.save().then(story => {
          return this.transitionToRoute('stories.create.story', story.id);
        });
      }
    }
  }
});
