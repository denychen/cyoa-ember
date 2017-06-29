import Ember from 'ember';

export default Ember.Controller.extend({
  page: null,
  story: Ember.computed.readOnly('model'),
  actions: {
    loadNextPage(id) {
      this.store.find('page', id).then(page => {
        this.set('page', page);
      });
    }
  }
});
