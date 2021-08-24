'use strict';

module.exports = function() {
  return {
    useYarn: true,
    scenarios: [
      {
        name: 'ember-lts-3.7',
        npm: {
          devDependencies: {
            'ember-source': '~3.7.0',
            'ember-data': '~3.7.0',
          }
        }
      },
      {
        name: 'ember-lts-3.8',
        npm: {
          devDependencies: {
            'ember-source': '~3.8.0',
            'ember-data': '~3.8.0',
          }
        }
      },
      {
        name: 'ember-lts-3.9',
        npm: {
          devDependencies: {
            'ember-source': '~3.9.0',
            'ember-data': '~3.9.0',
          }
        }
      },
      {
        name: 'ember-lts-3.10',
        npm: {
          devDependencies: {
            'ember-source': '~3.10.0',
            'ember-data': '~3.10.0',
          }
        }
      },
      {
        name: 'ember-lts-3.11',
        npm: {
          devDependencies: {
            'ember-source': '~3.11.0',
            'ember-data': '~3.11.0',
          }
        }
      },
      {
        name: 'ember-default',
        npm: {
          devDependencies: {}
        }
      }
    ]
  };
};
