import CreateRoute from './create/index';

export default CreateRoute.extend({
  templateName: 'stories/create/index',

  model(params) {
    return this.store.find('story', params.id);
  },

  actions: {
    willTransition() {
      return false;
    }
  }
});