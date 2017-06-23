import Ember from 'ember';

export default Ember.Controller.extend({
  story: Ember.computed.readOnly('model'),
  title: Ember.computed.readOnly('story.title'),
  firstPageId: Ember.computed.readOnly('story.firstPageId'),
  genres: Ember.computed.readOnly('story.genres'),
  formattedGenres: Ember.computed('genres', function() {
    return this.get('genres').sortBy('genres').join(', ');
  })
});
