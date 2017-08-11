import Ember from 'ember';

export default Ember.Controller.extend({
  emptyArray: Ember.A(),

  maxPageNameLength: 50,
  maxPageContentLength: 3000,

  contentLength: Ember.computed('activePage.content', function() {
    return this.get('maxPageContentLength') - (this.get('activePage.content.length') || 0);
  }),

  story: Ember.computed.readOnly('model.story'),
  pages: Ember.computed.reads('story.pages'),

  paths: Ember.computed.or('activePage.destinations', 'emptyArray'),
  hasPaths: Ember.computed.gt('paths.length', 0),

  isFirstPage: Ember.computed('activePage.id', 'activePage.story.firstPageId', function() {
    return this.get('activePage.id') === this.get('activePage.story.firstPageId');
  }),
  hasNoName: Ember.computed.empty('activePage.name'),

  showDeleteConfirmation: false,
  deleteConfirmationBody: Ember.computed('story.title', function() {
    return `Are you sure you want to delete ${this.get('story.title')}?`;
  }),

  actions: {
    selectPage(id) {
      let activePage = this.get('pages').find(page => page.id === id);
      this.set('activePage', activePage);
    },

    addDestination() {
      let newDestination = this.get('store').createRecord('destination', {
        order: this.get('paths.length') + 1
      });

      this.get('paths').pushObject(newDestination);
    },

    removePath(indexToRemove) {
      this.get('paths').removeAt(indexToRemove);
      this.get('paths').forEach((destination, index) => {
        if (index >= indexToRemove) {
          destination.set('order', index + 1);
        }
      });
    },

    setAsFirstPage() {
      let story = this.get('story');
      let page = this.get('activePage');

      story.set('firstPageId', page.get('id'));
      story.save();
    },

    deleteStory() {
      let story = this.get('story');
      return story.destroyRecord().then(() => {
        return this.transitionToRoute('stories.my-stories');
      });
    },

    toggleDeleteConfirmation() {
      this.toggleProperty('showDeleteConfirmation');
    },

    savePage() {
      let page = this.get('activePage');
      let hasAnyError = false;

      this.get('paths').forEach(destination => {
        if (Ember.isEmpty(destination.get('pageId'))) {
          destination.set('hasPathError', true);
          hasAnyError = true;
        }
      });

      if (!hasAnyError) {
        page.save().then(() => {
          this.set('activePage.destinations', this.get('activePage.destinations').rejectBy('id', null));
          this.get('notifications').success('Page saved', {
            autoClear: true
          });
        }).catch(() => {
          this.get('notifications').error('Page failed to save', {
            autoClear: true
          });
        });
      } else {
        this.get('notifications').error('All paths need to lead to a page', {
          autoClear: true
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
        let activeIndex = this.get('pages').toArray().findIndex(page => {
          return page.get('id') === this.get('activePage.id');
        });
        let newIndex = activeIndex === this.get('pages.length') - 1 ? activeIndex - 1 : activeIndex;

        this.get('activePage').destroyRecord().then(() => {
          if(this.get('pages.length') === 0) {
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
