import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['email'],
  email: null,
  
  session: Ember.inject.service('session'),
  anyError: Ember.computed.or('missingEmail', 'missingPassword', 'missingUsername'),
  noError: Ember.computed.not('anyError'),
  
  actions: {
    signup() {
      this.set('errorMessage', null);

      let email = this.get('email');
      let password = this.get('password');
      let username = this.get('username');

      if (!email) {
        this.set('missingEmail', true);
      } else {
        this.set('missingEmail', false);
      }

      if (!password) {
        this.set('missingPassword', true);
      } else {
        this.set('missingPassword', false);
      }

      if (!username) {
        this.set('missingUsername', true);
      } else {
        this.set('missingUsername', false);
      }

      if (this.get('noError')) {
        let user = this.get('store').createRecord('user', {
          email: email,
          password: password,
          username: username
        });

        this.set('user', user);
        
        user.save().then(() => {
          let credentials = { email: this.get('email'), password: this.get('password') };

          this.set('email', null);
          this.set('username', null);
          this.set('password', null);

          return this.get('session').authenticate('authenticator:custom', credentials).catch(() => {
             this.set('errorMessage', 'Failed to login. Please try again later.');
          });
        }).catch(error => {
          let errorMessage = error.errors[0].detail;
          this.set('errorMessage', errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1));
        });
      }
    }
  }
});
