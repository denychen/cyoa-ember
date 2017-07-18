import DS from 'ember-data';

export default DS.Model.extend({
  pageId: DS.attr(),
  option: DS.attr(),
  order: DS.attr()
});
