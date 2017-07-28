import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  authors: DS.hasMany('user', { async: false }),
  description: DS.attr(),
  genres: DS.attr(),
  firstPageId: DS.attr(),
  published: DS.attr('boolean', { defaultValue: false }),
  pages: DS.hasMany('page', { async: false }),
  createdAt: DS.attr()
});
