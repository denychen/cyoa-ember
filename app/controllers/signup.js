import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  
  actions: {
    signup() {
      this.get('store').createRecord('user', {
        "email": this.get('email'),
        "password": this.get('password'),
        "username": this.get('username')
      }).save().then(() => {
        let credentials = { email: this.get('email'), password: this.get('password') };

        this.set('email', null);
        this.set('username', null);
        this.set('password', null);

        return this.get('session').authenticate('authenticator:custom', credentials);
      });
    }
  }
});
