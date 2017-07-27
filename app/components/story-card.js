import Ember from 'ember';

export default Ember.Component.extend({
  story: null,
  
  classNames: ['u__remove-style', 'horizontally-align'],
  storyId: Ember.computed.readOnly('story.id'),
  title: Ember.computed.readOnly('story.title'),
  authors: Ember.computed('story.authors', function() {
    return this.get('story.authors').map(author => {
      return author.get('username');
    }).join(', ');
  }),
  description: Ember.computed.readOnly('story.description'),
  titleFirstLetter: Ember.computed('title', function() {
    return this.get('title').charAt(0);
  })
});
