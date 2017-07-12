import CustomAuthorizer from '../authorizers/custom';
 
export function initialize(container, application) {
  application.register('authorizer:custom', CustomAuthorizer);
}
 
export default {
  before: 'ember-simple-auth',
  name: 'custom-authorizer',
  initialize
};