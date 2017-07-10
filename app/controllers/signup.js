import Ember from 'ember';

export default Ember.Controller.extend({
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

        return this.transitionToRoute('stories');
      }).catch(error => {
        console.log(error);
      });
    }
  }
});
