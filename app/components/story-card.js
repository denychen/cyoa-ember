import Ember from 'ember';

export default Ember.Component.extend({
  story: null,
  
  storyId: Ember.computed.readOnly('story.id'),
  title: Ember.computed.readOnly('story.title'),
  authors: Ember.computed('story.authors', function() {
    return this.get('story.authors').map(author => {
      return author.get('username');
    }).join(', ');
  }),
  titleFirstLetter: Ember.computed('title', function() {
    return this.get('title').charAt(0);
  })
});
