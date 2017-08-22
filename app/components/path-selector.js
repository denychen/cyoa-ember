import Ember from 'ember';

export default Ember.Component.extend({
  hasPathError: Ember.computed.readOnly('path.hasPathError'),
  hasNoPages: Ember.computed.empty('pages'),
  maxOptionLength: 30,

  selectedPage: Ember.computed('pages.@each.id', 'path.pageId', function() {
    return this.get('pages').findBy('id', this.get('path.pageId'))
  }),

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
      path.set('pageId', selectedPage.get('id'));
    },

    removePath(index) {
      this.sendAction('removePath', index);
    }
  }
});
