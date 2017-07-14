import Ember from 'ember';

export default Ember.Controller.extend({
  story: Ember.computed.readOnly('model.story'),
  pages: Ember.computed.readOnly('story.pages')
});
