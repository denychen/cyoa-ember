import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  actions: {
    willTransition() {
      this.set('controller.errorMessage', null);
      this.set('controller.email', null);
      this.set('controller.missingEmail', false);
      this.set('controller.username', null);
      this.set('controller.missingUsername', false);
      this.set('controller.password', null);
      this.set('controller.missingPassword', false);
    }
  }
});
