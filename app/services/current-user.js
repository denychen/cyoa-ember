import Ember from 'ember';

export default Ember.Service.extend({
  session: Ember.inject.service('session'),
  store: Ember.inject.service('store'),

  load() {
    let userId = this.get('session.data.authenticated.userId');
    if (!Ember.isEmpty(userId)) {
      let user = this.get('store').peekRecord('user', userId);
      if (user === null) {
        return this.get('store').findRecord('user', userId).then(user => {
          this.set('user', user);
        });
      } else {
        this.set('user', user);
        return Ember.RSVP.resolve();
      }
    } else {
      return Ember.RSVP.resolve();
    }
  },

  update(email, username, token) {
    let userId = this.get('session.data.authenticated.userId');
    if (!Ember.isEmpty(userId)) {
      let user = this.get('store').peekRecord('user', userId);
      if (user === null) {
        return this.get('store').findRecord('user', userId).then(user => {
          user.set('email', email);
          user.set('username', username);
          user.set('token', token);
          this.set('user', user);
        });
      } else {
        user.set('email', email);
        user.set('username', username);
        user.set('token', token);
        this.set('user', user);
        return Ember.RSVP.resolve();
      }
    } else {
      return Ember.RSVP.resolve();
    }
  }
});
