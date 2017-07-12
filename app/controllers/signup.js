import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  
  actions: {
    signup() {
      Ember.$.ajax({
        url: 'http://localhost:3000/api/users/signup',
        type: 'POST',
        contentType: 'application/json',
        dataType : 'json',
        data: JSON.stringify({
          "email": this.get('email'),
          "password": this.get('password'),
          "username": this.get('username')
        })
      }).then(() => {
        let credentials = { email: this.get('email'), password: this.get('password') };

        this.set('email', null);
        this.set('password', null);
        this.set('username', null);

        return this.get('session').authenticate('authenticator:custom', credentials);
      });
    }
  }
});
