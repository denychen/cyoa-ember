import Ember from 'ember';

export default Ember.Component.extend({
  defaultPathName: Ember.computed('index', function() {
    return `Path ${this.get('index') + 1}`;
  }),

  actions: {
    updateDestination(destination, selectedPage) {
      destination.set('pageId', selectedPage.get('id'));
    },

    editPath() {
      this.toggleProperty('showPathEditor');
    },

    removePath(index) {
      this.sendAction('removePath', index);
    }
  }
});
