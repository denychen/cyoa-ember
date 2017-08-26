import Ember from 'ember';

export default Ember.Controller.extend({
  maxPageNameLength: 50,
  maxPageContentLength: 3000,
  maxPathCount: 3,
  pathCount: Ember.computed.reads('paths.length'),

  description: Ember.computed('story.description', function() {
    let description = this.get('story.description');

    if (description) {
      return this.get('story.description').split(/[\n\r]/gm);
    }
  }),

  contentLength: Ember.computed('activePage.content', function() {
    return this.get('maxPageContentLength') - (this.get('activePage.content.length') || 0);
  }),

  story: Ember.computed.readOnly('model.story'),
  pages: Ember.computed.reads('story.pages'),

  paths: Ember.computed.readOnly('activePage.destinations'),
  hasPaths: Ember.computed.gt('paths.length', 0),
  tooManyPaths: Ember.computed('hasPaths', 'paths.length', 'maxPathCount', function() {
    return this.get('hasPaths') && this.get('paths.length') === this.get('maxPathCount');
  }),

  isFirstPage: Ember.computed('activePage.id', 'activePage.story.firstPageId', function() {
    return this.get('activePage.id') === this.get('activePage.story.firstPageId');
  }),
  hasNoName: Ember.computed.empty('activePage.name'),

  showDeleteConfirmation: false,
  deleteStoryConfirmationBody: Ember.computed('story.title', function() {
    return `Are you sure you want to delete ${this.get('story.title')}?`;
  }),
  removePageConfirmationBody: 'Are you sure you want to remove this page? Paths to this page will be removed too.',

  isTitleOrContentDirty: Ember.computed('activePage.id', 'activePage.name', 'activePage.content', 'activePage.hasDirtyAttributes', function() {
    if (this.get('activePage.id') && this.get('activePage.hasDirtyAttributes')) {
      let changedAttributes = this.get('activePage').changedAttributes();
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

  isDestinationDirty: Ember.computed('activePage', 'activePage.destinations.@each.hasDirtyAttributes', 'activePage.isDirty', function() {
    let page = this.get('activePage');

    if (!page) {
      return false;
    }

    let paths = page.get('destinations');

    let hasDirtyDestination = paths.isAny('hasDirtyAttributes', true);

    let hasAddedOrRemovedDestination = false;
    if (page.get('isDirty')) {
      hasAddedOrRemovedDestination = page.didChange('destinations');
    }

    return hasDirtyDestination || hasAddedOrRemovedDestination;
  }),

  isDirty: Ember.computed.or('isTitleOrContentDirty', 'isDestinationDirty'),

  actions: {
    selectPage(id) {
      let activePage = this.get('pages').find(page => page.id === id);
      let breadCrumbs = this.get('breadCrumbs');

      breadCrumbs.clear();
      breadCrumbs.pushObject(activePage);
      this.set('activePage', activePage);
    },

    addPath() {
      if (!this.get('tooManyPaths')) {
        let newDestination = this.get('store').createRecord('destination', {
          order: this.get('paths.length') + 1
        });
  
        let page = this.get('activePage');
        page.startTrack();
        page.get('destinations').pushObject(newDestination);
      }
    },

    removePath(pathToRemove) {
      let page = this.get('activePage');
      page.startTrack();
      page.get('destinations').removeObject(pathToRemove);
      page.get('destinations').forEach((destination, index) => {
        if (index >= pathToRemove.get('order')) {
          destination.set('order', index + 1);
        }
      });
    },

    updateActivePage(page) {
      this.set('activePage', page);
      this.get('breadCrumbs').pushObject(page);
    },

    goToBreadCrumb(page, index) {
      this.set('activePage', page);
      this.set('breadCrumbs', this.get('breadCrumbs').slice(0, index + 1));
    },

    setAsFirstPage() {
      if (!this.get('isFirstPage')) {
        let story = this.get('story');
        let page = this.get('activePage');

        story.set('firstPageId', page.get('id'));
        story.save();
      }
    },

    deleteStory() {
      let story = this.get('story');
      return story.destroyRecord().then(() => {
        return this.transitionToRoute('stories.my-stories');
      });
    },

    toggleDeleteStoryConfirmation() {
      this.toggleProperty('showDeletStoryeConfirmation');
    },

    toggleRemovePageConfirmation() {
      if (!this.get('isFirstPage')) {
        this.toggleProperty('showRemoveStoryConfirmation'); 
      }
    },

    savePage() {
      if (this.get('isDirty')) {
        let newPagePromise = Ember.RSVP.resolve();

        this.get('paths').forEach((path, index) => {
          if (Ember.isEmpty(path.get('pageId'))) {
            let story = this.get('story');
            let newPage = this.get('store').createRecord('page');
            newPage.set('name', path.get('option'));
            newPage.set('story', story);

            let resolveNextPromise = () => {
              return newPagePromise.then(() => {
                return newPage.save().then(page => {
                  path.set('pageId', page.get('id'));
                });
              });
            };

            if (index < this.get('paths.length') - 1) {
              newPagePromise = resolveNextPromise();
            } else {
              newPagePromise = resolveNextPromise().then(() => {
                let page = this.get('activePage');
                page.save().then(() => {
                  page.set('destinations', page.get('destinations').rejectBy('id', null));
                  page.startTrack();
                  this.get('notifications').success('Page saved', {
                    autoClear: true
                  });
                }).catch(() => {
                  this.get('notifications').error('Page failed to save', {
                    autoClear: true
                  });
                });
              });
            }
          }
        });
      }
    },

    addPage() {
      let story = this.get('story');
      let newPage = this.get('store').createRecord('page');

      newPage.set('story', story);
      newPage.save().then(page => {
        let pages = this.get('pages');
        
        pages.pushObject(page);
        if (pages.length <= 1) {
          story.set('firstPageId', page.get('id'));
        }
        this.set('activePage', page);
      });

      Ember.$('.o__page-title__input')[0].focus();
    },

    removePage() {
      if (!this.get('isFirstPage')) {
        let activePage = this.get('activePage');
        let activeIndex = this.get('pages').toArray().findIndex(page => {
          return page.get('id') === activePage.get('id');
        });
        let newIndex = activeIndex === this.get('pages.length') - 1 ? activeIndex - 1 : activeIndex;

        activePage.destroyRecord().then(() => {
          this.get('pages').forEach(page => { 
            let destinations = page.get('destinations');
            let removedDestination = destinations.find(destination => destination.get('pageId') === activePage.get('id'));
            destinations.removeObject(removedDestination);
            
          });
          if (this.get('pages.length') === 0) {
            this.send('addPage');
          } else {
            this.set('activePage', this.get('pages').objectAt(newIndex));
          }
        });
      }
    },

    editStory() {
      return this.transitionToRoute('stories.update', this.get('story'));
    },

    focusPageTitleEdit() {
      Ember.$('.o__page-title__input')[0].focus();
    }
  }
});
