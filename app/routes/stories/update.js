import Ember from 'ember';
import ConfirmationMixin from 'ember-onbeforeunload/mixins/confirmation';

export default Ember.Route.extend(ConfirmationMixin, {
  templateName: 'stories/create/index',

  model(params) {
    return this.store.find('story', params.id);
  },

  setupController(controller, model) {
    this._super(controller, { story: model });

    this.store.findAll('genre').then(genres => {
      controller.set('genres', genres);
    });
  },

  shouldCheckIsPageDirty() {
    this._super(...arguments);
    return false;
  },

  isPageDirty(model) {
    let changedAttributes = model.changedAttributes();
    let originalGenres = this.get('controller.initiallySelectedGenres').mapBy('id');
    let newGenres = this.get('controller.selectedGenres').mapBy('id');
    
    let dirtyTitle = !Ember.isEmpty(changedAttributes['title']);
    let dirtyPremise = !Ember.isEmpty(changedAttributes['description']);
    let dirtyGenres = (originalGenres.length !== newGenres.length) || !originalGenres.every((genre, index) => {
      return genre === newGenres[index]; 
    });

    return dirtyTitle || dirtyPremise || dirtyGenres;
  },

  confirmationMessage: 'Changes you made may not be saved. Do you still want to continue?',
});