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
          // https://github.com/simplabs/ember-simple-auth/issues/926#issuecomment-243953558
          var newSession = this.get('session.data');
          newSession['authenticated']['token'] = newUser.user.token;
          this.get('session.store').persist(newSession);

          this.get('currentUser').update(newUser.user.email, newUser.user.username, newUser.user.token);

          this.set('email', null);
          this.set('username', null);
          this.set('password', null);
          this.set('oldPassword', null);
        });
      });
    }
  }
});
