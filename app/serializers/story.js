import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin).extend({
  attrs: {
    authors: { embedded: 'always' },
    genres: {embedded: 'always'}
  }
});