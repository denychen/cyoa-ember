import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  setupController(controller, model) {
    this._super(controller, { story: model });

    this.store.findAll('genre').then(genres => {
      controller.set('genres', genres);
    });
  },

  actions: {
    willTransition() {
      this.set('controller.title', null);
      this.set('controller.missingTitle', false);
      this.set('controller.premise', null);
      this.set('controller.selectedGenres', null);
      this.set('controller.missingGenre', false);
    }
  }
});
