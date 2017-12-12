import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('stories', function() {
    this.route('story', { path: '/:id' });
    this.route('create', function() {
      this.route('story', { path: '/:id'});
    });
    this.route('update', { path: '/update/:id' });
    this.route('my-stories');
  });
  this.route('signup');
  this.route('signin');
  this.route('settings');
  this.route('forgot-password');
  this.route('reset-password');
});

export default Router;
