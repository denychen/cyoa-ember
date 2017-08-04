import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.get('store').createRecord('story');
  },

  setupController(controller, model) {
    this._super(controller, { story: model });

    this.store.findAll('genre').then(genres => {
      controller.set('genres', genres);
    });
  }
});
