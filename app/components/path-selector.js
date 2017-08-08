import Ember from 'ember';

export default Ember.Component.extend({
  hasPathError: Ember.computed.readOnly('path.hasPathError'),
  
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
