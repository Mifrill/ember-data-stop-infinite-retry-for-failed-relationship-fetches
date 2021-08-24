import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import sinon from 'sinon';
import Response from 'ember-cli-mirage/response';
import { visit } from '@ember/test-helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';
import mockAdapterErrors from '../helpers/mock-adapter-errors';

module('with mockAdapterErrors', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  mockAdapterErrors(hooks);

  test('prevent infinite retry bug for failed relationship fetches', async function(assert) {
    // if this test got failed with one request instead of the expected 2 on ED upgrade
    // then we can drop this test and deprecate workaround in app/initializers/notify-property-change.js
    let getUserRequest = sinon.fake();
    let callback = assert.async(2);
    let user = server.create('user');
    server.create('note', { user });
    server.get('/notes/:id', function() {
      callback();
      getUserRequest();
      return new Response(404);
    });
    await visit('/');
    assert.strictEqual(getUserRequest.calledTwice, true);
  });
});
