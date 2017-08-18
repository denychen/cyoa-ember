import Ember from 'ember';
import config from './../config/environment';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service('current-user'),
  session: Ember.inject.service('session'),
  changedSetting: Ember.computed.or('email', 'username', 'password'),

  actions: {
    saveSettings() {
      let user = this.get('currentUser.user');
      let oldPassword = this.get('oldPassword');
      this.set('errorMessage', null);
      this.set('oldPasswordError', false);

      if (oldPassword) {
        this.set('oldPasswordError', false);
      } else {
        this.set('oldPasswordError', true);
      }

      if (!this.get('oldPasswordError') && this.get('changedSetting')) {
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
          let errorMessage = error.responseJSON.errors[0].detail;
          if (errorMessage.startsWith('Old password')) {
            this.set('oldPasswordError', true);
          }
          this.set('errorMessage', errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1));
        });
      }
    }
  }
});
