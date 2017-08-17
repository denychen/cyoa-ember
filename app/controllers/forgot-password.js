import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['email'],
  email: null,

  actions: {
    resetPassword() {      
      let email = this.get('email');

      if (email) {
        this.set('missingEmail', false);
      } else {
        this.set('missingEmail', true);
      }

      this.set('emailSent', true);
    }
  }
});
