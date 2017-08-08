import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    updateDestination(destination, selectedPage) {
      destination.set('pageId', selectedPage.get('id'));
    },

    togglePreview() {
      this.toggleProperty('showPreview');
    },

    removePath(index) {
      this.sendAction('removePath', index);
    }
  }
});
