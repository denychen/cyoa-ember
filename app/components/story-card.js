import Ember from 'ember';

export default Ember.Component.extend({
  titleFirstLetter: Ember.computed('title', function() {
    return this.get('title').charAt(0);
  })
});
