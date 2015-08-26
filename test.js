var depStats = require('./')
var test = require('tape')

test('get reigstry stats of all package.json dependencies', function (t) {
  t.plan(3)
  depStats({
    dependencies: { 'tape': '^4.2.0' }
  }, function (err, data) {
    if (err) throw err

    t.equal(data[0].name, 'tape')
    t.equal(data[0].version, '^4.2.0')
    t.equal(typeof data[0].stats.description, 'string', 'gets stats')
  })
})
