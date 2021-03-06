import Ember from 'ember';

export default Ember.Controller.extend({
  stories: Ember.computed.readOnly('model'),
  additionalRowsToShow: 0,
  paginatedStories: Ember.computed('additionalRowsToShow', 'stories.@each.published', 'stories.[]', function() {
    let storyLines = Ember.A();
    let storyLine = Ember.A();
    let sortedPublishedStories = this.get('stories').rejectBy('published', false);
    let numStories = sortedPublishedStories.length;

    sortedPublishedStories.forEach((story, index) => {
      if (this.get('additionalRowsToShow') >= storyLines.length) {
        storyLine.pushObject(story);

        if (storyLine.length === 5 || index === numStories - 1) {
          storyLines.pushObject(storyLine);
          storyLine = Ember.A();
        }
      }
    });

    return storyLines;
  }),

  actions: {
    willTransition() {
      this.set('additionalRowsToShow', 0);
      return true;
    },

    showMoreStories() {
      this.set('additionalRowsToShow', this.get('additionalRowsToShow') + 1);
      let paginatedStories = this.get('paginatedStories');
      let stories = paginatedStories.get('lastObject')

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
