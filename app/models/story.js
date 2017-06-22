import DS from 'ember-data';

export default DS.Model.extend({
  firstPageId: DS.attr(),
  title: DS.attr()
});
