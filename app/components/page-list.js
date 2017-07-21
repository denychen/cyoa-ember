import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    selectPage(id) {
      this.sendAction('selectPage', id);
    },

    addPage() {
      this.sendAction('addPage');
    }
  }
});
