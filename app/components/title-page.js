import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  
  story: null,
  title: Ember.computed.readOnly('story.title'),
  authors: Ember.computed('story.authors', function() {
    return this.get('story.authors').map(author => {
      return author.get('username');
    }).join(', ');
  }),
  description: Ember.computed('story.description', function() {
    let description = this.get('story.description');

    if (description) {
      return this.get('story.description').split(/[\n\r]/gm);
    }
  }),
  firstPageId: Ember.computed.readOnly('story.firstPageId'),
  genres: Ember.computed.readOnly('story.genres'),
  formattedGenres: Ember.computed('genres', function() {
    let genres = this.get('genres').sortBy('genre').map(genre => genre.genre).join(' ');
    return genres.replace(/\w\S*/g, function(genre) {
      return genre.charAt(0).toLowerCase() + genre.substr(1);
    });
  }),

  actions: {
    loadNextPage(id) {
      this.sendAction('loadNextPage', id);
    }
  }
});
