import Ember from 'ember';

export default Ember.Component.extend({
  defaultPageName: 'Untitled page',
  pageName: Ember.computed.or('page.name', 'defaultPageName'),

  actions: {
    removePage(page) {
      this.sendAction('removePage', page);
    }
  }
});
