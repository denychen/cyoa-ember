/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    build: {},
    // include other plugin configuration that applies to all deploy targets here
    'revision-data': {
      type: 'git-commit'
    },
    'ssh-index': {
      remoteDir: "/usr/local/www/cyoa",
      username: "denychen",
      host: "73.189.62.98",
      privateKeyFile: "~/.ssh/id_rsa",
      passphrase: process.env.PRIVATE_KEY_PASSPHRASE,
      allowOverwrite: true
    },
    rsync: {
      dest: "/usr/local/www/cyoa",
      username: "denychen",
      host: "73.189.62.98",
      delete: false
    }
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
