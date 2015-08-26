var packageStats = require('./')
var readPackage = require('read-closest-package')

readPackage(function (err, data) {
  if (err) throw err
  packageStats(data, {
    filter: function (pkg) {
      return pkg.list === 'dependencies'
    }
  }, function (err, deps) {
    if (err) throw err

    // print dependency name and registry description
    deps = deps.map(function (d) {
      return d.name + ': ' + d.stats.description
    })
    console.log(deps.join('\n'))
  })
})
