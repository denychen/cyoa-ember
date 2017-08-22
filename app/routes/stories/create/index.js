import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ConfirmationMixin from 'ember-onbeforeunload/mixins/confirmation';

export default Ember.Route.extend(AuthenticatedRouteMixin, ConfirmationMixin, {
  model() {
    return this.get('store').createRecord('story');
  },

  afterModel() {
    return this.store.findAll('genre').then(genres => {
      let formattedGenres = genres.map(genre => {
        return { id: genre.id, genre: genre.get('genre') };
      });

      this.set('genres', formattedGenres);
    });
  },

  setupController(controller, model) {
    this._super(controller, { story: model });

    controller.set('genres', this.get('genres'));
  },

  shouldCheckIsPageDirty(transition) {
    this._super(...arguments);
    return transition.targetName === 'stories.create.story';
  },

  isPageDirty() {
    let dirtyAttributes = model.changedAttributes();
    let dirtyTitle = dirtyAttributes['title'];
    let dirtyPremise = dirtyAttributes['description'];
    let dirtyGenres = !Ember.isEmpty(this.get('controller.selectedGenres'));

    return dirtyTitle || dirtyPremise || dirtyGenres;
  },

  confirmationMessage: 'Changes you made may not be saved. Do you still want to continue?',

  actions: {
    willTransition() {
      let transition = this._super(...arguments);
      
      if (transition) {
        this.get('controller.model.story').rollbackAttributes()
      }

      return true;
    }
  }
});
