import Ember from 'ember';

export default Ember.Controller.extend({
  stories: Ember.computed.readOnly('model'),
  unpublishedStories: Ember.computed.filterBy('stories', 'published', false),
  publishedStories: Ember.computed.filterBy('stories', 'published', true),

  actions: {
    togglePublishStatus(story) {
      story.toggleProperty('published');
      if (!story.get('firstPublishedAt')) {
        story.set('firstPublishedAt', new Date());
      }
      story.save();
    },

    startStory() {
      return this.transitionToRoute('stories.create');
    }
  }
});
