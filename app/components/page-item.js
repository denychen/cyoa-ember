import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    removePage(page) {
      this.sendAction('removePage', page);
    }
  }
});
