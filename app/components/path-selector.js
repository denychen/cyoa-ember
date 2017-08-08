import Ember from 'ember';

export default Ember.Component.extend({
  hasPathError: Ember.computed.readOnly('path.hasPathError'),
  hasNoPages: Ember.computed.empty('pages'),
  
  actions: {
    updatePath(path, selectedPage) {
      this.set('path.hasPathError', false);
      path.set('pageId', selectedPage.get('id'));
    },

    togglePreview() {
      this.toggleProperty('showPreview');
    },

    removePath(index) {
      this.sendAction('removePath', index);
    }
  }
});
