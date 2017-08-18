import Ember from 'ember';
import config from './../config/environment';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service('current-user'),
  session: Ember.inject.service('session'),
  changedSetting: Ember.computed.or('email', 'username', 'password'),
  anyPasswordError: Ember.computed.or('oldPasswordError', 'newPasswordError'),
  noPasswordError: Ember.computed.not('anyPasswordError'),
  minimumPasswordLength: 8,

  actions: {
    saveSettings() {
      let user = this.get('currentUser.user');
      let newPassword = this.get('password');
      let oldPassword = this.get('oldPassword');
      this.set('errorMessage', null);
      this.set('emailError', false);
      this.set('usernameError', false);
      this.set('oldPasswordError', false);
      this.set('newPasswordError', false);

      if (newPassword) {
        let passwordLengthRequirement = newPassword.length < this.get('minimumPasswordLength');
        this.set('newPasswordError', passwordLengthRequirement);
        if (passwordLengthRequirement) {
          this.set('errorMessage', `New password should be at least ${minimumPasswordLength} characters long`);
        }
      }

      if (oldPassword) {
        this.set('oldPasswordError', false);
      } else {
        this.set('oldPasswordError', true);
      }

      if (this.get('noPasswordError') && this.get('changedSetting')) {
        Ember.$.ajax({
          url: `${config.backend}/api/users/`,
          type: 'PUT',
          headers: { 'Authorization': `Bearer ${user.get('token')}` },
          contentType: 'application/json',
          dataType : 'json',
          data: JSON.stringify({
            "email": this.get('email'), 
            "username": this.get('username'),
            "password": this.get('password'),
            "oldPassword": this.get('oldPassword')
          })
        }).then(newUser => {
          // https://github.com/simplabs/ember-simple-auth/issues/926#issuecomment-243953558
          var newSession = this.get('session.data');
          newSession['authenticated']['token'] = newUser.user.token;
          this.get('session.store').persist(newSession);

          this.get('currentUser').update(newUser.user.email, newUser.user.username, newUser.user.token);

          this.set('email', null);
          this.set('username', null);
          this.set('password', null);
          this.set('oldPassword', null);

          this.get('notifications').success('Settings successfully changed', {
            autoClear: true
          });
        }).catch(error => {
          let message = error.responseJSON.errors[0].detail;
          let errorMessage = message.charAt(0).toUpperCase() + message.slice(1);

          if (errorMessage === 'Old password must be valid') {
            this.set('oldPasswordError', true);
          } else if (errorMessage === 'The password does not meet requirements') {
            this.set('newPasswordError', true);
          }  if (errorMessage === 'Email must be unique') {
            this.set('emailError', true);
          } else if (errorMessage === 'Username must be unique') {
            this.set('usernameError', true);
          }
          
          this.set('errorMessage', errorMessage);
        });
      }
    }
  }
});
