import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  signUpEmail: null,
  
  model(params) {
    this.set('signUpEmail', params.email);
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('signUpEmail', this.get('signUpEmail'));
  },

  actions: {
    willTransition() {
      this.set('controller.errorMessage', null);
      this.set('controller.email', null);
      this.set('controller.signUpEmail', null);
      this.set('controller.emailError', false);
      this.set('controller.username', null);
      this.set('controller.usernameError', false);
      this.set('controller.password', null);
      this.set('controller.missingPassword', false);
    }
  }
});
