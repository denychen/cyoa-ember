import Ember from 'ember';

export default Ember.Controller.extend({
  page: null,
  story: Ember.computed.readOnly('model'),
  hasDestinations: Ember.computed.notEmpty('page.destinations'),
  actions: {
    loadNextPage(id) {
      if (id) {
        this.store.find('page', id).then(page => {
          this.set('page', page);
        });
      } else {
        this.set('page', null);
      }
    }
  }
});
