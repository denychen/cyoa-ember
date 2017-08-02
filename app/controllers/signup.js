import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  anyError: Ember.computed.or('missingEmail', 'missingPassword', 'missingUsername'),
  noError: Ember.computed.not('anyError'),
  
  actions: {
    signup() {
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
        this.get('store').createRecord('user', {
          email: email,
          password: password,
          username: username
        }).save().then(() => {
          let credentials = { email: this.get('email'), password: this.get('password') };

          this.set('email', null);
          this.set('username', null);
          this.set('password', null);

          return this.get('session').authenticate('authenticator:custom', credentials);
        });
      }
    }
  }
});
