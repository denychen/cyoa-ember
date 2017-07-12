import CustomAuthorizer from '../authorizers/custom';
 
export function initialize(container, application) {
  application.register('authorizer:custom', CustomAuthorizer);
}
 
export default {
  name:       'custom-authorizer',
  before:     'ember-simple-auth',
  initialize: initialize
};