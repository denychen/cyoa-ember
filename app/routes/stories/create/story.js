import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ConfirmationMixin from 'ember-onbeforeunload/mixins/confirmation';

export default Ember.Route.extend(AuthenticatedRouteMixin, ConfirmationMixin, {
  currentUser: Ember.inject.service('current-user'),
  
  model(params) {
    return Ember.RSVP.hash({
      story: this.get('store').findRecord('story', params.id, { include: 'pages', reload: true })
    });
  },

  afterModel(model) {    
    let isAuthor = model.story.get('authors').any(author => {
      return author.get('id') === this.get('currentUser.user.id');
    });

    if (!isAuthor) {
      this.replaceWith('stories.create');
    }
  },

  shouldCheckIsPageDirty() {
    this._super(...arguments);
    return false;
  },

  isPageDirty(model) {
    let pages = model.story.get('pages');

    return pages.any(page => {      
      let paths = page.get('destinations');
  
      let hasDirtyDestination = paths.isAny('hasDirtyAttributes', true);
  
      let hasAddedOrRemovedDestination = false;
      if (page.get('isDirty')) {
        hasAddedOrRemovedDestination = page.didChange('destinations');
      }

      if (hasDirtyDestination || hasAddedOrRemovedDestination) {
        return true;
      }

      if (page.get('id') && page.get('hasDirtyAttributes')) {
        return true;
      }

      return false;
    });
  },

  confirmationMessage: 'Changes you made may not be saved. Do you still want to continue?',

  setupController(controller, model) {
    this._super(controller, model);

    let story = model.story;
    let pages = story.get('pages');

    let page = null;
    if (pages.length === 0) {
      page = this.get('store').createRecord('page');
      page.set('story', story);
      page.save().then(page => {
        pages.pushObject(page);
        story.set('firstPageId', page.get('id'));
        controller.set('activePage', page);
        controller.set('breadCrumbs', Ember.A([page]));
      });
    } else {
      page = pages.findBy('id', story.get('firstPageId'));
      controller.set('activePage', page);
      controller.set('breadCrumbs', Ember.A([page]));
    }
  },

  actions: {
    willTransition() {
      let transition = this._super(...arguments);
      
      if (transition) {
        this.get('controller.story.pages').forEach(page => {
          page.rollbackAttributes();

          let destinationsToRemove = Ember.A();
          page.get('destinations').forEach(destination => {
            if (destination && destination.get('id')) {
              destination.rollbackAttributes();
            } else {
              destinationsToRemove.pushObject(destination);
            }
          });

          page.get('destinations').removeObjects(destinationsToRemove);
        });
      }

      return true;
    },

    didTransition() {
      Ember.run.scheduleOnce('afterRender', this, () => {
        let input = Ember.$('.o__page-title__input')[0];
        if (!input.value) {
          input.focus();
        }
      });
    }
  }
});
