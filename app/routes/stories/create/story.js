import Ember from 'ember';
import RSVP from 'rsvp';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  currentUser: Ember.inject.service('current-user'),
  
  model(params) {
    return RSVP.hash({
      story: this.get('store').findRecord('story', params.storyId, { reload: true })
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
    let pages = model.story.get('pages');

    if (pages.length === 0) {
      let newPage = this.get('store').createRecord('page');
      pages.pushObject(newPage);
    }

    controller.set('model', model);
  }
});
