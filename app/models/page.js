import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr(),
  name: DS.attr(),
  destinations: DS.hasMany('destination', { async: false })
});
