import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['isActivePage:o__active-page'],
  defaultPageName: 'Untitled page',
  pageName: Ember.computed.or('page.name', 'defaultPageName'),
  isDirty: Ember.computed('page.id', 'page.hasDirtyAttributes', function() {
    if (this.get('page.id')) {
      return this.get('page.hasDirtyAttributes');
    } else {
      return false;
    }
  }),
  isActivePage: Ember.computed('page.id', 'activePage.id', function() {
    return this.get('page.id') === this.get('activePage.id');
  })
});
