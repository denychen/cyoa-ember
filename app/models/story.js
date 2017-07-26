import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  authors: DS.attr(),
  description: DS.attr(),
  genres: DS.attr(),
  firstPageId: DS.attr(),
  published: DS.attr(),
  pages: DS.hasMany('page', { async: false }),
  createdAt: DS.attr()
});
