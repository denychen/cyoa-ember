import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  forgotPasswordEmail: null,
  
  model(params) {
    this.set('forgotPasswordEmail', params.email);
  },

  setupController(controller, model) {
    this._super(controller, model);

    controller.set('forgotPasswordEmail', this.get('forgotPasswordEmail'));
  },

  actions: {
    willTransition() {
      this.set('controller.email', null);
      this.set('controller.forgotPasswordEmail', null);
      this.set('controller.missingEmail', false);
      this.set('controller.emailSent', false);
    }
  }
});
