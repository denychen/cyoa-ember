import { moduleForModel, test } from 'ember-qunit';

moduleForModel('page', 'Unit | Serializer | page', {
  // Specify the other units that are required for this test.
  needs: ['serializer:page']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
