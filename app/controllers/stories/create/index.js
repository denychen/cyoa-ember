import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  currentUser: Ember.inject.service('current-user'),

  emptyGenres: Ember.A(),
  genres: null,

  maxTitleLength: 70,
  maxPremiseLength: 1000,
  maxGenreCount: 3,

  maxGenreCountMet: Ember.computed('selectedGenresCount', 'maxGenreCount', function() {
    return this.get('selectedGenresCount') >= this.get('maxGenreCount');
  }),
  maxGenreCountMessage: Ember.computed('maxGenreCount', function() {
    return `Max ${this.get('maxGenreCount')} genres`;
  }),

  story: Ember.computed.readOnly('model.story'),
  title: Ember.computed.readOnly('story.title'),
  premise: Ember.computed.readOnly('story.description'),
  
  selectedGenreIds: Ember.computed.mapBy('story.genres', 'id'),
  selectedGenresCount: Ember.computed.readOnly('selectedGenres.length'),
  selectedGenres: Ember.computed('genres.[]', 'story.genres.[]', function() {
    let selectedGenreIds = this.get('selectedGenreIds');

    if (!Ember.isEmpty(selectedGenreIds)) {
      return this.get('genres').filter(genre => {
        return selectedGenreIds.includes(parseInt(genre.id));
      });
    } else {
      return false;
    }
  }),
  
  anyError: Ember.computed.or('missingTitle', 'missingGenre'),
  noErrors: Ember.computed.not('anyError'),

  titleLength: Ember.computed('title', function() {
    return this.get('maxTitleLength') - (this.get('title.length') || 0);
  }),

  premiseLength: Ember.computed('premise', function() {
    return this.get('maxPremiseLength') - (this.get('premise.length') || 0);
  }),

  actions: {
    updateSelectedGenres(selectedGenres) {
      let newGenres = selectedGenres.map(selectedGenre => {
        return { id: parseInt(selectedGenre.id), genre: selectedGenre.genre };
      });
      this.set('story.genres', newGenres);
    },

    saveStory() {
      let story = this.get('story');
      let title = story.get('title');
      let author = this.get('currentUser.user');

      title ? this.set('missingTitle', false) : this.set('missingTitle', true);
      !Ember.isEmpty(this.get('story.genres')) ? this.set('missingGenre', false) : this.set('missingGenre', true);
      
      if (this.get('noErrors')) {
        let genres = this.get('selectedGenres').map(genre => {
          return {
            id: genre.id,
            genre: genre.genre
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
