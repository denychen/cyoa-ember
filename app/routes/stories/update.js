import Ember from 'ember';
import ConfirmationMixin from 'ember-onbeforeunload/mixins/confirmation';

export default Ember.Route.extend(ConfirmationMixin, {
  templateName: 'stories/create/index',

  model(params) {
    return this.store.find('story', params.id);
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

    controller.set('model', { story: model });
    controller.set('genres', this.get('genres'));
  },

  shouldCheckIsPageDirty(transition) {
    this._super(...arguments);
    return transition.targetName === 'stories.create.story';
  },

  isPageDirty(model) {
    let dirtyAttributes = model.changedAttributes();

    let dirtyTitle = dirtyAttributes['title'];
    let dirtyPremise = dirtyAttributes['description'];
    let dirtyGenres = dirtyAttributes['genres'];

    let isGenreDirty = false;
    if (dirtyGenres) {
      let originalGenres = dirtyGenres[0]
      let newGenres = dirtyGenres[1]
      isGenreDirty = (originalGenres.length !== newGenres.length) || !originalGenres.every((genre, index) => {
        return genre.id === newGenres[index].id; 
      });
    }

    return dirtyTitle || dirtyPremise || isGenreDirty;
  },

  actions: {
    willTransition() {
      let transition = this._super(...arguments);
      
      if (transition) {
        this.get('controller.model.story').rollbackAttributes();
        this.set('controller.missingTitle', false);
        this.set('controller.missingGenre', false);
      }

      return true;
    }
  },

  confirmationMessage: 'Changes you made may not be saved. Do you still want to continue?',
});