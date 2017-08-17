import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  actions: {
    willTransition() {
      this.set('controller.missingResetToken', false);
      this.set('controller.missingPassword', false);
      this.set('controller.missingVerifyPassword', false);
      this.set('controller.mismatchPasswords', false);
      this.set('controller.errorMessage', null);
    }
  }
});
