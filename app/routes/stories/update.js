import Ember from 'ember';
import ConfirmationMixin from 'ember-onbeforeunload/mixins/confirmation';

export default Ember.Route.extend(ConfirmationMixin, {
  templateName: 'stories/create/index',

  model(params) {
    return this.store.find('story', params.id);
  },

  afterModel() {
    return this.store.findAll('genre').then(genres => {
      this.set('genres', genres);
    });
  },

  setupController(controller, model) {
    this._super(controller, { story: model });

    controller.set('model', { story: model });
    controller.set('genres', this.get('genres'));
  },

  shouldCheckIsPageDirty(transition) {
    this._super(...arguments);
    return transition.targetName === 'stories.create.story';
  },

  isPageDirty(model) {
    let originalGenres = this.get('controller.initiallySelectedGenres').mapBy('id');
    let newGenres = this.get('controller.selectedGenres').mapBy('id');
    
    let dirtyTitle = this.get('controller.title') !== model.get('title');
    let dirtyPremise = this.get('controller.premise') !== model.get('description');
    let dirtyGenres = (originalGenres.length !== newGenres.length) || !originalGenres.every((genre, index) => {
      return genre === newGenres[index]; 
    });

    return dirtyTitle || dirtyPremise || dirtyGenres;
  },

  actions: {
    willTransition() {
      let transition = this._super(...arguments);
      
      if (transition) {
        this.set('controller.title', this.get('controller.story.title'));
        this.set('controller.premise', this.get('controller.story.description'));
        this.set('controller.selectedGenres', this.get('controller.initiallySelectedGenres'));
      }

      return true;
    }
  },

  confirmationMessage: 'Changes you made may not be saved. Do you still want to continue?',
});