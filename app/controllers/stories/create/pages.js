import Ember from 'ember';

export default Ember.Controller.extend({
  story: Ember.computed.readOnly('model.story'),
  pages: Ember.computed.readOnly('story.pages'),

  activePage: Ember.computed('pages', function() {
    return this.get('pages.firstObject');
  }),

  actions: {
    selectPage(id) {
      let activePage = this.get('pages').find(page => page.id === id);
      this.set('activePage', activePage);
    }
  }
});
