import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr(),
  password: DS.attr(),
  username: DS.attr(),
  lastLogin: DS.attr()
});
