import Ember from 'ember';

export function genreEmoji(params, hash) {
  return {
    1: '🗡️',
    2: '📔',
    3: '🐉',
    4: '👻',
    5: '🔎',
    6: '💓',
    7: '🤖'
  }[hash.id];
}

export default Ember.Helper.helper(genreEmoji);
