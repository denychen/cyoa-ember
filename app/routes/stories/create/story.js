import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
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
      page = pages.get('firstObject');
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
