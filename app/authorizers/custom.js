import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
  session: Ember.inject.service(),

  authorize(data, block) {
    let token = data['token'];

    if (this.get('session.isAuthenticated') && !Ember.isEmpty(token)) {
      block('Authorization', `Bearer ${token}`);
    }
  }
});