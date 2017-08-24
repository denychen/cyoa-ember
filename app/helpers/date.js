import Ember from 'ember';

export function date(params, hash) {
  let date = new Date(hash.date);

  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

export default Ember.Helper.helper(date);
