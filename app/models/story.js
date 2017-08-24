import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string', { defaultValue: '' }),
  authors: DS.hasMany('user', { async: false }),
  description: DS.attr('string', { defaultValue: '' }),
  genres: DS.attr(),
  firstPageId: DS.attr(),
  published: DS.attr('boolean', { defaultValue: false }),
  pages: DS.hasMany('page', { async: false }),
  firstPublishedAt: DS.attr(),
  createdAt: DS.attr()
});
