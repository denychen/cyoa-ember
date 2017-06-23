import Ember from 'ember';

export default Ember.Controller.extend({
  stories: Ember.computed.readOnly('model'),
  storiesSorting: ['createdAt:desc'],
  sortedStories: Ember.computed.sort('stories', 'storiesSorting')
});
