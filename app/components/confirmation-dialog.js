import Ember from 'ember';

export default Ember.Component.extend({
  messageContinue: 'Yes',
  messageCancel: 'No',

  actions: {
    continueDialog() {
      this.sendAction('continueDialog');
      this.send('cancelDialog');
    },

    cancelDialog() {
      this.set('showDialog', false);
    }
  }
});
