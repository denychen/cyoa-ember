import Ember from 'ember';

export default Ember.Component.extend({
  hasPathError: Ember.computed.readOnly('path.hasPathError'),
  hasNoPages: Ember.computed.empty('pages'),
  maxOptionLength: 30,

  optionLength: Ember.computed('path.option', function() {
    return this.get('maxOptionLength') - (this.get('path.option.length') || 0);
  }),

  
  actions: {
    goToPath() {
      let selectedPage = this.get('selectedPage');

      if (selectedPage) {
        this.sendAction('updateActivePage', selectedPage);
      }
    },
    
    updatePath(path, selectedPage) {
      this.set('path.hasPathError', false);
      this.set('selectedPage', selectedPage);
      path.set('pageId', selectedPage.get('id'));
    },

    removePath(index) {
      this.sendAction('removePath', index);
    }
  }
});
