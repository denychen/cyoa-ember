import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',

  willDestroyElement() {
    this._super(...arguments);
    this.set('page', null);
  },

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
