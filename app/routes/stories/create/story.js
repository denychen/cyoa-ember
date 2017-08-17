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
      let hasDirtyDestinations = page.get('destinations').isAny('hasDirtyAttributes', true);
      
      if (hasDirtyDestinations) {
        return true;
      }

      if (page.get('id') && page.get('hasDirtyAttributes')) {
        let changedAttributes = page.changedAttributes();
        return Object.values(changedAttributes).some(attributes => {
          let original = attributes[0];
          let updated = attributes[1]
          if (original === null && updated === "") {
            return false;
          } else {
            return attributes[0] !== attributes[1];
          }
        });
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
      });
    } else {
      page = pages.findBy('id', story.get('firstPageId'));
      controller.set('activePage', page);
    }
  },

  actions: {
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
