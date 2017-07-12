import CustomAuthenticator from '../authenticators/custom';

export function initialize(application) {
  application.register('authenticator:custom', CustomAuthenticator);
}

export default {
  before: 'ember-simple-auth',
  name: 'custom-authenticator',
  initialize
};
