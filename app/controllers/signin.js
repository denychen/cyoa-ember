import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    signin() {
      new Ember.RSVP.Promise((resolve, reject) => {
        return (this.get('session.isAuthenticated')) ? this.get('session').invalidate() : resolve(true);
      }).then (() => {
        let credentials = { email: this.get('email'), password: this.get('password') };

        return this.get('session').authenticate('authenticator:custom', credentials);
      });
    }
  }
});
