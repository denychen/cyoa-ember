import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['email'],
  email: null,
  
  session: Ember.inject.service('session'),
  anyError: Ember.computed.or('emailError', 'passwordError', 'usernameError'),
  noError: Ember.computed.not('anyError'),
  enteredEmail: Ember.computed.or('signUpEmail', 'email'),

  minimumPasswordLength: 8,
  
  actions: {
    signup() {
      this.set('errorMessage', null);

      let email = this.get('enteredEmail');
      let password = this.get('password');
      let username = this.get('username');

      if (!email) {
        this.set('emailError', true);
      } else {
        this.set('emailError', false);
      }

      if (!password) {
        this.set('passwordError', true);
      } else {
        let passwordLengthRequirement = password.length < this.get('minimumPasswordLength');
        this.set('passwordError', passwordLengthRequirement);
        if (passwordLengthRequirement) {
          this.set('errorMessage', `Password should be at least ${this.get('minimumPasswordLength')} characters long`);
        }
      }

      if (!username) {
        this.set('usernameError', true);
      } else {
        this.set('usernameError', false);
      }

      if (this.get('noError')) {
        let user = this.get('store').createRecord('user', {
          email: email,
          password: password,
          username: username
        });

        this.set('user', user);
        
        user.save().then(() => {
          let credentials = { email: this.get('email'), password: this.get('password') };

          this.set('email', null);
          this.set('username', null);
          this.set('password', null);

          return this.get('session').authenticate('authenticator:custom', credentials).catch(() => {
             this.set('errorMessage', 'Failed to login. Please try again later.');
          });
        }).catch(error => {
          let message = error.errors[0].detail;
          let errorMessage = message.charAt(0).toUpperCase() + message.slice(1);

          if (errorMessage === 'Email must be unique') {
            this.set('emailError', true);
          } else if (errorMessage === 'Username must be unique') {
            this.set('usernameError', true);
          }

          this.set('errorMessage', errorMessage);
        });
      }
    }
  }
});
