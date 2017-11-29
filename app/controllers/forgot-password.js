import Ember from 'ember';
import config from './../config/environment';

export default Ember.Controller.extend({
  queryParams: ['email'],
  email: null,

  enteredEmail: Ember.computed.or('forgotPasswordEmail', 'email'),

  actions: {
    resetPassword() {      
      let email = this.get('enteredEmail');

      if (email) {
        this.set('missingEmail', false);
      } else {
        this.set('missingEmail', true);
      }

      Ember.$.ajax({
        url: `${config.backend}/api/users/forgot-password`,
        type: 'POST',
        contentType: 'application/json',
        dataType : 'json',
        data: JSON.stringify({
          "email": email
        })
      });

      this.set('emailSent', true);
    }
  }
});
