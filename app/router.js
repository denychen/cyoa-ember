import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('stories', function() {
    this.route('story', { path: '/:storyId' });
    this.route('create', function() {
      this.route('story', { path: '/:storyId'});
    });
    this.route('my-stories');
  });
  this.route('signup');
  this.route('signin');
});

export default Router;
