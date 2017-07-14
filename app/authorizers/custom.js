import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';
 
 
export default Base.extend({
  //notice the change, it will add an authorization header, in this case I'm using basic http authentication.
  authorize: function(addHeaderFunction/*, requestOptions*/) {
     if (this.get('session.isAuthenticated') && !Ember.isEmpty(this.get('session.authenticated.token'))) {
       var basicHTTPToken = btoa(this.get('session.authenticated.userId') + ":" + this.get('session.authenticated.token'));
       addHeaderFunction('Authorization', 'Basic ' + basicHTTPToken);
     }
   }
});