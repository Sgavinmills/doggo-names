import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | doggos-main', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:doggos-main');
    assert.ok(route);
  });
});
