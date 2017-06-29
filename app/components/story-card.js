import Ember from 'ember';

export default Ember.Component.extend({
  story: null,
  
  classNames: ['u__remove-style', 'horizontally-align'],
  storyId: Ember.computed.readOnly('story.id'),
  title: Ember.computed.readOnly('story.title'),
  description: Ember.computed.readOnly('story.description'),
  titleFirstLetter: Ember.computed('title', function() {
    return this.get('title').charAt(0);
  })
});
