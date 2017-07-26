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
  }
});
