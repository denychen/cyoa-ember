import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return Ember.RSVP.hash({
      unpublished: this.store.query('story', { user: true, type: 'unpublished' }),
      published: this.store.query('story', { user: true, type: 'published' })
    });
  }
});
