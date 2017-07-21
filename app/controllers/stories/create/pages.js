import Ember from 'ember';

export default Ember.Controller.extend({
  emptyArray: Ember.A(),

  story: Ember.computed.readOnly('model.story'),
  pages: Ember.computed.reads('story.pages'),

  activePage: Ember.computed.reads('pages.firstObject'),

  destinations: Ember.computed.or('activePage.destinations', 'emptyArray'),

  actions: {
    updateDestination(destination, selectedPage) {
      destination.set('pageId', selectedPage.get('id'));
    },
    
    selectPage(id) {
      let activePage = this.get('pages').find(page => page.id === id);
      this.set('activePage', activePage);
    },

    addDestination() {
      this.get('destinations').pushObject(this.get('store').createRecord('destination'));
    },

    removeDestination() {
      this.get('destinations').popObject();
    },

    savePage() {
      this.get('activePage').save();
    },

    addPage() {
      let newPage = this.get('store').createRecord('page');
      this.get('pages').pushObject(newPage);
      this.set('activePage', newPage);
    }
  }
});
