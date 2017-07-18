import Ember from 'ember';

export function selectedPage(params, hash) {
  let pages = hash.pages;
  let pageId = hash.pageId;

  return pages.find(page => page.id === pageId);
}

export default Ember.Helper.helper(selectedPage);
