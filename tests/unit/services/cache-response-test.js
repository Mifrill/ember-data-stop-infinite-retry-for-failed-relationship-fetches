import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('service:cache-response', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.service = this.owner.lookup('service:cache-response');
  });

  hooks.afterEach(function() {
    this.service.reset();
  });

  test('returns true on handle repeated requests', function(assert) {
    assert.strictEqual(this.service.isRetry, false);
    this.service.handle([404, 'Not found', { url: '/users/1', method: 'GET' }]);
    assert.strictEqual(this.service.isRetry, false);
    this.service.handle([404, 'Not found', { url: '/users/1', method: 'GET' }]);
    assert.strictEqual(this.service.isRetry, true);
  });

  test('returns false on handle different error requests', function(assert) {
    assert.strictEqual(this.service.isRetry, false);
    this.service.handle([404, 'Not found', { url: '/users/1', method: 'GET' }]);
    assert.strictEqual(this.service.isRetry, false);
    this.service.handle([404, 'Not found', { url: '/users/2', method: 'GET' }]);
    assert.strictEqual(this.service.isRetry, false);
  });

  test('returns false on handle repeated not-error requests', async function(assert) {
    assert.strictEqual(this.service.isRetry, false);
    this.service.handle([201, 'created', { url: '/users', method: 'POST' }]);
    assert.strictEqual(this.service.isRetry, false);
    this.service.handle([201, 'created', { url: '/users', method: 'POST' }]);
    assert.strictEqual(this.service.isRetry, false);
  });

  test('returns true on handle repeated server-error requests', async function(assert) {
    assert.strictEqual(this.service.isRetry, false);
    this.service.handle([500, 'server error', { url: '/users', method: 'GET' }]);
    assert.strictEqual(this.service.isRetry, false);
    this.service.handle([500, 'server error', { url: '/users', method: 'GET' }]);
    assert.strictEqual(this.service.isRetry, true);
  });

  test('returns false on handle different not-error requests', async function(assert) {
    assert.strictEqual(this.service.isRetry, false);
    this.service.handle([200, { user: { id: 1 } }, { url: '/users/1', method: 'GET' }]);
    assert.strictEqual(this.service.isRetry, false);
    this.service.handle([200, { user: { id: 2 } }, { url: '/users/2', method: 'GET' }]);
    assert.strictEqual(this.service.isRetry, false);
  });

  test('returns false on handle repeated not-error requests with different responses', async function(assert) {
    assert.strictEqual(this.service.isRetry, false);
    this.service.handle([200, { user: { id: 1, name: 'John' } }, { url: '/users/1', method: 'GET' }]);
    assert.strictEqual(this.service.isRetry, false);
    this.service.handle([200, { user: { id: 1, name: 'James' } }, { url: '/users/1', method: 'GET' }]);
    assert.strictEqual(this.service.isRetry, false);
  });

  test('returns false on handle error requests not in a row', async function(assert) {
    assert.strictEqual(this.service.isRetry, false);
    this.service.handle([200, { users: [{ user: { id: 1 } }] }, { url: '/users', method: 'GET' }]);
    assert.strictEqual(this.service.isRetry, false);
    this.service.handle([404, 'Not found', { url: '/users/2', method: 'GET' }]);
    assert.strictEqual(this.service.isRetry, false);
    this.service.handle([200, { users: [{ user: { id: 1 } }] }, { url: '/users', method: 'GET' }]);
    assert.strictEqual(this.service.isRetry, false);
    this.service.handle([404, 'Not found', { url: '/users/2', method: 'GET' }]);
    assert.strictEqual(this.service.isRetry, false);
  });
});
