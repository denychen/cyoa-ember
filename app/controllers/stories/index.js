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
    loadMore(story) {
      this.store.query('story', { id: story.get('id') });
    }
  }
});
