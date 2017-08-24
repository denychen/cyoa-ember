import Ember from 'ember';

export default Ember.Controller.extend({
  stories: Ember.computed.readOnly('model'),
  unpublishedStories: Ember.computed.reads('stories.unpublished'),
  publishedStories: Ember.computed.reads('stories.published'),

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
      let published = story.get('published');

      if (published) {
        this.get('publishedStories').content.removeObject(story._internalModel);
        this.get('unpublishedStories').content.unshiftObject(story._internalModel);
      } else {
        this.get('unpublishedStories').content.removeObject(story._internalModel);
        this.get('publishedStories').content.unshiftObject(story._internalModel);
      }
      
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
    },

    showMoreUnpublished() {
      let lastUnpublishedStory = this.get('unpublishedStories.lastObject');
      this.store.query('story', { user: true, type: 'unpublished', id: lastUnpublishedStory.get('id') }).then(stories => {
        this.set('noMoreUnpublished', stories.get('length') === 0);
        stories.forEach(story => {
          // https://github.com/emberjs/data/issues/3530
          this.get('unpublishedStories').content.addObject(story._internalModel);
        });
      });
    },

    showMorePublished() {
      let lastPublishedStory = this.get('publishedStories.lastObject');
      this.store.query('story', { user: true, type: 'published', id: lastPublishedStory.get('id') }).then(stories => {
        this.set('noMorePublished', stories.get('length') === 0);
        stories.forEach(story => {
          // https://github.com/emberjs/data/issues/3530
          this.get('publishedStories').content.addObject(story._internalModel);
        });
      });
    }
  }
});