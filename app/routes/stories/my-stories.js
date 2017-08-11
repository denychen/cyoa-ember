import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  beforeModel() {
    return this.store.unloadAll('story');
  },
  
  model() {
    return this.store.query('story', { user: true });
  }
});
