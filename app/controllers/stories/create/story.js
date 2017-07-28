import Ember from 'ember';

export default Ember.Controller.extend({
  emptyArray: Ember.A(),

  story: Ember.computed.readOnly('model.story'),
  pages: Ember.computed.reads('story.pages'),

  activePage: Ember.computed.reads('pages.firstObject'),

  destinations: Ember.computed.or('activePage.destinations', 'emptyArray'),

  isFirstPage: Ember.computed('activePage.id', 'activePage.story.firstPageId', function() {
    return this.get('activePage.id') === this.get('activePage.story.firstPageId');
  }),

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

    setAsFirstPage() {
      let story = this.get('story');
      let page = this.get('activePage');

      story.set('firstPageId', page.get('id'));
      story.save();
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
      page.save();
    },

    addPage() {
      let newPage = this.get('store').createRecord('page');
      newPage.set('story', this.get('story'));
      newPage.save().then(page => {
        this.get('pages').pushObject(page);
        this.set('activePage', page);
      });
    },

    removePage() {
      this.get('activePage').destroyRecord().then(() => {
        if(this.get('pages.length') === 0) {
          this.send('addPage');
        } else {
          this.set('activePage', this.get('pages.lastObject'));
        }
      });
    }
  }
});
