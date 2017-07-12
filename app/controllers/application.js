import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    signout() {
      this.get('session').invalidate();
    }
  }
});
