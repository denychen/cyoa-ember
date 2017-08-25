import Ember from 'ember';

export default Ember.Component.extend({
  hasPathError: Ember.computed.readOnly('path.hasPathError'),
  hasNoPages: Ember.computed.empty('pages'),
  maxOptionLength: 30,

  selectedPage: Ember.computed('pagePagesWithNew.@each.id', 'path.pageId', function() {
    return this.get('pagePagesWithNew').findBy('id', this.get('path.pageId'));
  }),

  optionLength: Ember.computed('path.option', function() {
    return this.get('maxOptionLength') - (this.get('path.option.length') || 0);
  }),

  pathPages: Ember.computed.reads('pages'),
  pagePagesWithNew: Ember.computed('pathPages', function() {
    let pathPages = this.get('pathPages').toArray();
    pathPages.push({ name: '+ New path' });
    
    return pathPages;
  }),

  actions: {
    goToPath() {
      let selectedPage = this.get('selectedPage');
      let selectedPageId = selectedPage.get('id');

      if (selectedPageId) {
        this.sendAction('updateActivePage', selectedPage);
      }
    },
    
    updatePath(path, selectedPage) {
      this.set('path.hasPathError', false);
      path.set('pageId', selectedPage.id);
    },

    removePath(path) {
      this.sendAction('removePath', path);
    }
  }
});
