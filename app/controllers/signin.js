import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['email'],
  email: null,

  session: Ember.inject.service('session'),
  hasErrors: Ember.computed.or('missingEmail', 'missingPassword'),
  hasNoErrors: Ember.computed.not('hasErrors'),

  actions: {
    signin() {
      let email = this.get('email');
      let password = this.get('password');

      if (email) {
        this.set('missingEmail', false);
      } else {
        this.set('missingEmail', true);
      }

      if (password) {
        this.set('missingPassword', false);
      } else {
        this.set('missingPassword', true);
      }

      if (this.get('hasNoErrors')) {
        new Ember.RSVP.Promise((resolve/*, reject*/) => {
          return (this.get('session.isAuthenticated')) ? this.get('session').invalidate() : resolve(true);
        }).then (() => {
          let credentials = { email: email, password: password };

          return this.get('session').authenticate('authenticator:custom', credentials);
        });
      }
    }
  }
});
