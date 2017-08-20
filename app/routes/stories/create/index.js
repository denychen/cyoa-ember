import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ConfirmationMixin from 'ember-onbeforeunload/mixins/confirmation';

export default Ember.Route.extend(AuthenticatedRouteMixin, ConfirmationMixin, {
  model() {
    return this.get('store').createRecord('story');
  },

  setupController(controller, model) {
    this._super(controller, { story: model });

    this.store.findAll('genre').then(genres => {
      controller.set('genres', genres);
    });
  },

  shouldCheckIsPageDirty(transition) {
    this._super(...arguments);
    return transition.targetName === 'stories.create.story';
  },

  isPageDirty() {
    let dirtyTitle = !Ember.isEmpty(this.get('controller.title'));
    let dirtyPremise = !Ember.isEmpty(this.get('controller.premise'));
    let dirtyGenres = !Ember.isEmpty(this.get('controller.selectedGenres'));

    return dirtyTitle || dirtyPremise || dirtyGenres;
  },

  confirmationMessage: 'Changes you made may not be saved. Do you still want to continue?',

  actions: {
    willTransition() {
      let transition = this._super(...arguments);
      
      if (transition) {
        this.set('controller.title', null);
        this.set('controller.premise', null);
        this.set('controller.selectedGenres', Ember.A());
      }

      return true;
    }
  }
});
