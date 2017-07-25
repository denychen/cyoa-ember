import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['isActivePage:o__active-page'],
  defaultPageName: 'Untitled page',
  pageName: Ember.computed.or('page.name', 'defaultPageName'),
  isActivePage: Ember.computed('page.id', 'activePage.id', function() {
    return this.get('page.id') === this.get('activePage.id');
  })
});
