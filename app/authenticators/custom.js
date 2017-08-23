import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import config from './../config/environment';

export default Base.extend({
  store: Ember.inject.service('store'),

  restore(data) {
    return new Ember.RSVP.Promise((resolve, reject) => { 
      if (!Ember.isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate(options) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        url: `${config.backend}/api/users/signin`,
        type: 'POST',
        contentType: 'application/json',
        dataType : 'json',
        data: JSON.stringify({
          "email": options.email, 
          "password": options.password
        })
      }).then(response => {
        this.get('store').pushPayload(response);

        let user = response.user;
        return resolve({ token: user.token, userId: user.id });
      }, function (xhr/*, status, error*/) {
        return reject(xhr.responseText);
      });
    });
  },

  invalidate(data) {
    return new Ember.RSVP.Promise(resolve => {
      Ember.$.ajax({
        url: `${config.backend}/api/users/signout`,
        type: 'POST',
        headers: { 'Authorization': `Bearer ${data.token}` },
        contentType: 'application/json',
        dataType : 'json'
      }).then((/*response*/) => {
        return resolve(data);
      }, function (/*xhr, status, error*/) {
        return resolve(data);
      });
    });
  }
});