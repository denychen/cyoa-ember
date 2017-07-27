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
  description: Ember.computed.readOnly('story.description'),
  firstPageId: Ember.computed.readOnly('story.firstPageId'),
  genres: Ember.computed.readOnly('story.genres'),
  formattedGenres: Ember.computed('genres', function() {
    let genres = this.get('genres').sortBy('genres').join(' ');
    return genres.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toLowerCase() + txt.substr(1);
    });
  }),

  actions: {
    loadNextPage(id) {
      this.sendAction('loadNextPage', id);
    }
  }
});
