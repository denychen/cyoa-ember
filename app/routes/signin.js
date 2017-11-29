import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  signInEmail: null,

  model(params) {
    this.set('signInEmail', params.email);
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('signInEmail', this.get('signInEmail'));
  },

  actions: {
    willTransition() {
      this.set('controller.loginError', null);
      this.set('controller.email', null);
      this.set('controller.signInEmail', null);
      this.set('controller.missingEmail', false);
      this.set('controller.password', null);
      this.set('controller.missingPassword', false);
    }
  }
});
