import Ember from 'ember';

export default Ember.Component.extend({
  messageContinue: 'Yes',
  messageCancel: 'No',
  isPositive: Ember.computed.equal('confirmationType', 'positive'),
  isNegative: Ember.computed.equal('confirmationType', 'negative'),

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
