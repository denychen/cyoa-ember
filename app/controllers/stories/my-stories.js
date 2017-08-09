import Ember from 'ember';

export default Ember.Controller.extend({
  stories: Ember.computed.readOnly('model'),
  unpublishedStories: Ember.computed.filterBy('stories', 'published', false),
  publishedStories: Ember.computed.filterBy('stories', 'published', true),

  showPublishDialog: false,
  publishStory: null,
  publishAction: Ember.computed('publishStory.published', function() {
    return this.get('publishStory.published') ? 'unpublish' : 'publish';
  }),
  publishConfirmationBody: Ember.computed('publishStory.published', 'publishStory.title', function() {
    return `Are you sure you want to ${this.get('publishAction')} ${this.get('publishStory.title')}?`;
  }),
  publishConfirmationMessageContinue: Ember.computed('publishAction', function() {
    let action = this.get('publishAction');
    return action.charAt(0).toUpperCase() + action.slice(1);
  }),

  actions: {
    continuePublish() {
      let story = this.get('publishStory');

      story.toggleProperty('published');
      if (!story.get('firstPublishedAt')) {
        story.set('firstPublishedAt', new Date());
      }
      story.save();
      this.set('publishStory', null);
    },

    showPublishConfirmation(story) {
      this.set('publishStory', story);
      this.set('showPublishDialog', true);
    },

    startStory() {
      return this.transitionToRoute('stories.create');
    }
  }
});