import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.findAll('genre');
  },

  actions: {
    willTransition(transition) {
      this.set('controller.title', null);
      this.set('controller.premise', null);
      this.set('controller.selectedGenres', null);
    }
  }
});
