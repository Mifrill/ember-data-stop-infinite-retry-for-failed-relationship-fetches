ember-data-stop-infinite-retry-for-failed-relationship-fetches
==============================================================================

This addon is a workaround to unblock Ember upgrade during existed bug in ember-data (from 3.1.2 to 3.12): 

**"infinite retry bug for failed relationship fetches"**

> we're actually experiencing this issue with v3.1.2 (which we upgraded to for the fix for #4963). We're aiming to upgrade rapidly soon, but have a few blocking factors that we have to tackle first.

(https://github.com/emberjs/data/pull/6112#issuecomment-519675040)

related to:
- https://github.com/emberjs/data/issues/5814
- https://github.com/emberjs/data/issues/6467
- https://github.com/emberjs/data/issues/5836
- https://github.com/emberjs/data/pull/5376
- https://github.com/emberjs/data/pull/5541

Installation
------------------------------------------------------------------------------

```
ember install ember-data-stop-infinite-retry-for-failed-relationship-fetches
```


Usage
------------------------------------------------------------------------------

Change `app/adapters/application.js`:

```JS
import DS from 'ember-data';
import { inject as service } from '@ember/service';

export default DS.JSONAPIAdapter.extend({
  cacheResponse: service(),

  handleResponse(status, headers, payload, requestData) {
    // ...
    if (status !== 200) {
      this.get('cacheResponse').handle([status, payload, requestData]);
    }

    return this._super(status, headers, payload, requestData);
  },
  // ...
});
```
compatible with https://github.com/adopted-ember-addons/active-model-adapter


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone git@github.com:Mifrill/ember-data-stop-infinite-retry-for-failed-relationship-fetches.git`
* `cd ember-data-stop-infinite-retry-for-failed-relationship-fetches`
* `npm install`

### Linting

* `yarn lint:js`
* `yarn lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
