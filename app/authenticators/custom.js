import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  restore(data) {
    return new Ember.RSVP.Promise(function(resolve, reject) { 
      if (!Ember.isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },

  authenticate(options) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax({
        url: 'http://localhost:3000/api/users/signin',
        type: 'POST',
        contentType: 'application/json',
        dataType : 'json',
        data: JSON.stringify(
        {
          "email": options.email, 
          "password": options.password
        })
      }).then(function (response) {
        resolve({ token: response.token, userId: response.id });
      }, function (xhr, status, error) {
        reject(xhr.responseText);
      });
    });
  },

  invalidate(data) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax({
        url: 'http://localhost:3000/api/users/signout',
        type: 'DELETE',
        contentType: 'application/json',
        dataType : 'json',
        data: JSON.stringify(
        {
          "userId": data.userId, 
        })
      }).then(function (response) {
        resolve(data);
      }, function (xhr, status, error) {
        resolve(data);
      });
    });
  }
});