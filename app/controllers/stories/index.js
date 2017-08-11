import Ember from 'ember';

export default Ember.Controller.extend({
  stories: Ember.computed.readOnly('model'),
  storiesSorting: ['createdAt:desc'],
  sortedStories: Ember.computed.sort('stories', 'storiesSorting'),
  paginatedStories: Ember.computed('sortedStories.[]', function() {
    let storyLines = Ember.A();
    let storyLine = Ember.A();
    let numStories = this.get('sortedStories.length');

    this.get('sortedStories').forEach((story, index) => {
      storyLine.pushObject(story);

      if (storyLine.length === 5 || index === numStories - 1) {
        storyLines.pushObject(storyLine);
        storyLine = Ember.A();
      }
    });

    return storyLines;
  }),

  actions: {
    showMoreStories(stories) {
      let lastStory = stories.objectAt(stories.length - 1);
      if (lastStory.get('id') === null) {
        lastStory = stories.objectAt(stories.length - 2);
      }
      this.store.query('story', { id: lastStory.get('id') }).then(newStories => {
        this.set('noMoreStories', newStories.get('length') === 0);
      });
    }
  }
});
