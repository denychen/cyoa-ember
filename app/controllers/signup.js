import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  
  actions: {
    signup() {
      this.get('store').createRecord('user', {
        email: this.get('email'),
        password: this.get('password'),
        username: this.get('username')
      }).save().then(user => {
        this.set('email', null);
        this.set('password', null);
        this.set('username', null);

        new Ember.RSVP.Promise((resolve, reject) => {
          return (this.get('session.isAuthenticated')) ? this.get('session').invalidate() : resolve(true);
        }).then (() => {
          let credentials = { email: user.get('email'), password: user.get('password') };

          return this.get('session').authenticate('authenticator:custom', credentials);
        });
      });
    }
  }
});
