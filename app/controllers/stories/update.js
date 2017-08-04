import Ember from 'ember';
import CreateController from './create/index';

export default CreateController.extend({
  story: Ember.computed.readOnly('model.story'),
  title: Ember.computed.reads('story.title'),
  premise: Ember.computed.reads('story.description'),
  initiallySelectedGenres: Ember.computed.filter('genres', function(genre) {
    return this.get('story.genres').includes(genre.get('genre'));
  }).property('genres', 'genres.genre', 'story.genres'),
  selectedGenres: Ember.computed.reads('initiallySelectedGenres'),

  actions: {
    createStory() {
      let story = this.get('story');
      story.set('title', this.get('title'));
      story.set('description', this.get('premise'));
      story.set('genres', this.get('selectedGenres'));
      story.save();
    }
  }
});
