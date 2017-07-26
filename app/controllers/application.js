import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  showUserDropdown: false,

  actions: {
    signout() {
      this.get('session').invalidate();
    },

    clickMe() {
      this.toggleProperty('showUserDropdown');
    },
  }
});
