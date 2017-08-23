import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['box', 'column', 'o__vertical-align', 'page-creator__page-item'],
  classNameBindings: ['isActivePage:o__active-page', 'isFirstPage:o__list__first-page', 'isNotFirstPage:o__list__not-first-page'],
  defaultPageName: 'Untitled page',
  pageName: Ember.computed.or('page.name', 'defaultPageName'),
  _destinations: Ember.computed.reads('page.destinations'),

  isTitleOrContentDirty: Ember.computed('page.id', 'page.name', 'page.content', 'page.hasDirtyAttributes', function() {
    if (this.get('page.id') && this.get('page.hasDirtyAttributes')) {
      let changedAttributes = this.get('page').changedAttributes();
      return Object.values(changedAttributes).some(attributes => {
        let original = attributes[0];
        let updated = attributes[1]
        if (original == null && updated === "") {
          return false;
        } else {
          return attributes[0] !== attributes[1];
        }
      });
    }
    
    return false;
  }),

  isDestinationDirty: Ember.computed('page', 'page.destinations.@each.hasDirtyAttributes', 'page.isDirty', function() {
    let page = this.get('page');
    let paths = page.get('destinations');

    let hasDirtyDestination = paths.isAny('hasDirtyAttributes', true);

    let hasAddedOrRemovedDestination = false;
    if (page.get('isDirty')) {
      hasAddedOrRemovedDestination = page.didChange('destinations');
    }

    return hasDirtyDestination || hasAddedOrRemovedDestination;
  }),

  isDirty: Ember.computed.or('isTitleOrContentDirty', 'isDestinationDirty'),

  isActivePage: Ember.computed('page.id', 'activePage.id', function() {
    return this.get('page.id') === this.get('activePage.id');
  }),
  isFirstPage: Ember.computed('page.id', 'page.story.firstPageId', function() {
    return this.get('page.id') === this.get('page.story.firstPageId');
  }),
  isNotFirstPage: Ember.computed.not('isFirstPage')
});
