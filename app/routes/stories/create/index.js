import Ember from 'ember';
import RSVP from 'rsvp';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return RSVP.hash({
      genres: this.store.findAll('genre')
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
