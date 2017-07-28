import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  currentUser: Ember.inject.service('current-user'),
  showUserDropdown: false,

  actions: {
    signout() {
      this.get('session').invalidate();
    },

    clickUsername() {
      this.toggleProperty('showUserDropdown');
    },
  }
});
