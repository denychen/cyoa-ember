import Ember from 'ember';

export default Ember.Controller.extend({
  stories: Ember.computed.readOnly('model'),
  draftStories: Ember.computed.filterBy('stories', 'published', false),
  publishedStories: Ember.computed.filterBy('stories', 'published', true)
});
