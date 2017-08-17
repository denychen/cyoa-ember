import Ember from 'ember';
import config from './../config/environment';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  queryParams: ['resetToken'],
  resetToken: null,

  actions: {
    resetPassword() {
      let resetToken = this.get('resetToken');
      let password = this.get('password');
      let verifyPassword = this.get('verifyPassword');

      if (resetToken) {
        this.set('missingResetToken', false);
      } else {
        this.set('missingResetToken', true);
        this.set('errorMessage', 'You’re missing the reset token, so try the link from the email again');
        return;
      }

      if (password) {
        this.set('missingPassword', false);
      } else {
        this.set('missingPassword', true);
        return;
      }

      if (verifyPassword) {
        this.set('missingVerifyPassword', false);
      } else {
        this.set('missingVerifyPassword', true);
        return;
      }

      if (password === verifyPassword) {
        this.set('mismatchPasswords', false);
      } else {
        this.set('mismatchPasswords', true);
        this.set('errorMessage', 'Your passwords do not match');
        return;
      }

      this.set('errorMessage', null);

      Ember.$.ajax({
        url: `${config.backend}/api/users/reset-password`,
        type: 'POST',
        contentType: 'application/json',
        dataType : 'json',
        data: JSON.stringify({
          "resetToken": resetToken,
          "password": password
        })
      }).then(() => {
        this.get('notifications').success('Password successfully changed', {
          autoClear: true
        });

        return this.transitionToRoute('signin');
      }).catch(error => {
        this.set('errorMessage', error.responseJSON.errors[0].detail);
      });
    }
  }
});
