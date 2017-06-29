import Ember from 'ember';

export default Ember.Controller.extend({
  story: Ember.computed.readOnly('model'),
  title: Ember.computed.readOnly('story.title'),
  description: Ember.computed.readOnly('story.description'),
  firstPageId: Ember.computed.readOnly('story.firstPageId'),
  genres: Ember.computed.readOnly('story.genres'),
  formattedGenres: Ember.computed('genres', function() {
    let genres = this.get('genres').sortBy('genres').join(' ');
    return genres.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toLowerCase() + txt.substr(1);
    });
  })
});
