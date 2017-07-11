import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  page: null,

  willDestroyElement() {
    this._super(...arguments);
    this.set('page', null);
  },

  actions: {
    loadNextPage(id) {
      this.sendAction('loadNextPage', id);
    }
  }
});
