import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  actions: {
    willTransition() {
      this.set('controller.email', null);
      this.set('controller.username', null);
      this.set('controller.password', null);
      this.set('controller.oldPassword', null);
      this.set('controller.missingOldPassword', false);
    }
  }
});
