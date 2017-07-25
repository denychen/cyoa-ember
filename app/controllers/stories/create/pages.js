import Ember from 'ember';

export default Ember.Controller.extend({
  emptyArray: Ember.A(),

  story: Ember.computed.readOnly('model.story'),
  pages: Ember.computed.reads('story.pages'),

  activePage: Ember.computed.reads('pages.firstObject'),

  destinations: Ember.computed.or('activePage.destinations', 'emptyArray'),

  actions: {
    selectPage(id) {
      let activePage = this.get('pages').find(page => page.id === id);
      this.set('activePage', activePage);
    },

    addDestination() {
      let newDestination = this.get('store').createRecord('destination', {
        order: this.get('destinations.length')
      });

      this.get('destinations').pushObject(newDestination);
    },

    removePath(indexToRemove) {
      this.get('destinations').removeAt(indexToRemove);
      this.get('destinations').forEach((destination, index) => {
        if (index >= indexToRemove) {
          destination.set('order', index + 1);
        }
      });
    },

    saveStory() {
      let story = this.get('story');
      if (story.get('hasDirtyAttributes')) {
        story.save();
      }

      this.send('savePage');
    },

    savePage() {
      let page = this.get('activePage');
      if (page.get('hasDirtyAttributes')) {
        page.save();
      }
    },

    addPage() {
      let newPage = this.get('store').createRecord('page');
      this.get('pages').pushObject(newPage);
      this.set('activePage', newPage);
    },

    removePage() {
      this.get('activePage').destroyRecord().then(() => {
        this.set('activePage', this.get('pages.lastObject'));
      });
    }
  }
});
