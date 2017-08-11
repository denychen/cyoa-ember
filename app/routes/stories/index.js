import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    return this.store.unloadAll('story');
  },

  model() {
    return this.store.findAll('story');
  }
});
