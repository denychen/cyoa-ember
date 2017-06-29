import Ember from 'ember';

export default Ember.Controller.extend({
  page: null,
  story: Ember.computed.readOnly('model'),
  title: Ember.computed.readOnly('story.title'),
  description: Ember.computed.readOnly('story.description'),
  firstPageId: Ember.computed.readOnly('story.firstPageId'),
  genres: Ember.computed.readOnly('story.genres'),
  formattedGenres: Ember.computed('genres', function() {
    let genres = this.get('genres').sortBy('genres').join(' ');
    return genres.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toLowerCase() + txt.substr(1);
    });
  }),
  sortedDestinations: Ember.computed('page.destinations', function() {
    return this.get('page.destinations').sortBy('order');
  }),
  actions: {
    loadNextPage(id) {
      this.store.find('page', id).then(page => {
        this.set('page', page);
      });
    }
  }
});
