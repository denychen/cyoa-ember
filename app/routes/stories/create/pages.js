import Ember from 'ember';
import RSVP from 'rsvp';


export default Ember.Route.extend({
  model(params) {
    return RSVP.hash({
      story: this.get('store').findRecord('story', params.storyId, { reload: true })
    });
  }
});
