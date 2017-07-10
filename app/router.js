import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('stories', function() {
    this.route('story', { path: '/:storyId' });
  });
  this.route('pages', { path: 'pages/:pageId' });
  this.route('signup');
});

export default Router;
