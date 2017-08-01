import Ember from 'ember';

export default Ember.Controller.extend({
  currentUser: Ember.inject.service('current-user'),
  session: Ember.inject.service('session'),

  actions: {
    saveSettings() {
      let user = this.get('currentUser.user');

      new Ember.RSVP.Promise((resolve/*, reject*/) => {
        Ember.$.ajax({
          url: 'http://localhost:3000/api/users/',
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
          let user = this.get('currentUser.user');

          user.set('email', newUser.user.email);
          user.set('username', newUser.user.username);
          user.set('token', newUser.user.token);

          this.set('session.data.authenticated.token', newUser.user.token);

          this.set('email', null);
          this.set('username', null);
          this.set('password', null);
          this.set('oldPassword', null);
        });
      });
    }
  }
});
