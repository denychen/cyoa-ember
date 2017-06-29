import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',

  page: null,
  sortedDestinations: Ember.computed('page.destinations', function() {
    return this.get('page.destinations').sortBy('order');
  }),

  actions: {
    loadNextPage(id) {
      this.sendAction('loadNextPage', id);
    }
  }
});
