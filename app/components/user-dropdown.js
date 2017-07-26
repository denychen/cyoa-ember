import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    signout() {
      this.sendAction('signout');
      this.send('closeMenu');
    },

    closeMenu() {
      this.sendAction('closeMenu');
    }
  }
});
