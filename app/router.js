import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('stories');
  this.route('pages', { path: 'pages/:pageId' });
});

export default Router;
