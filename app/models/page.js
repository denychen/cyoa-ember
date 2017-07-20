import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr(),
  name: DS.attr('string', { defaultValue: 'Untitled Page' }),
  destinations: DS.hasMany('destination', { async: false })
});
