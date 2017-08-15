import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  page: null,

  content: Ember.computed('page.content', function() {
    let lines = this.get('page.content').split(/[\n\r]/gm);
    return lines;
  }),

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
