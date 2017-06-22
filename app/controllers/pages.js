import Ember from 'ember';

export default Ember.Controller.extend({
  pages: Ember.computed.readOnly('model'),
  destinations: Ember.computed.readOnly('pages.destinations'),
  sortedDestinations: Ember.computed('destinations', function() {
    return this.get('destinations').sortBy('order');
  })
});
