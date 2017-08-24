import DS from 'ember-data';

export default DS.Model.extend({
  changeTracker: { trackHasMany: true, enableIsDirty: true, only: ['destinations'] },

  story: DS.belongsTo('story'),
  content: DS.attr('string', { defaultValue: '' }),
  name: DS.attr('string', { defaultValue: '' }),
  destinations: DS.hasMany('destination', { async: false })
});
