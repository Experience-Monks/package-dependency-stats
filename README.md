# package-dependency-stats

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Gets the npm reigstry stats for all the dependencies in a `package.json` object. Also see [gh-repo-dependencies](https://www.npmjs.com/package/gh-repo-dependencies).

## Install

```sh
npm install package-dependency-stats --save
```

## Example

```js
var packageStats = require('package-dependency-stats')
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
```

## Usage

[![NPM](https://nodei.co/npm/package-dependency-stats.png)](https://www.npmjs.com/package/package-dependency-stats)

#### `packageDepStats(packageJson, [opt], [cb])`

Fetches npm registry stats from the dependencies in `packageJson` (an object).

Options:

- `filter` (Function) optionally filter the dependencies before querying npm registry 

For example, `filter` could look like this to avoid querying registry stats of devDependencies.

```js
function filterDeps (package) {
  return package.list === 'dependencies'
}
```

The callback takes the form `(err, data)`, where `data` is a flat array of dependencies gleaned from `dependencies`, `devDependencies`, `peerDependencies`, `optionalDependencies` (in that order) unless otherwise filtered.

Each item has the following data:

```js
{
  name: 'inherits',     // name as it appears in package.json
  version: '^2.0.1',    // version range from package.json
  list: 'dependencies', // type of dependency
  stats: { ... }        // registry stats
  error: Error          // Error object if there was a problem
}
```

If `stats` could not be retrieved for that package, it will be null and `error` will be populated with the Error object. Otherwise `error` will not be defined.

The stats are fetched using [npm-stats](https://www.npmjs.com/package/npm-stats).

*Note:* `packageJson` can be a simple object like so:

```json
{
  dependencies: { ... },
  devDependencies: { ... }
}
```

## See Also

- [gh-repo-dependencies](https://www.npmjs.com/package/gh-repo-dependencies) - same as this tool, but gleaned from a GitHub repository
- [repo-deps](https://www.npmjs.com/package/repo-deps) - CLI tool with similar goals
- [read-closest-package](https://www.npmjs.com/package/read-closest-package) - get a package.json from cwd

## License

MIT, see [LICENSE.md](http://github.com/Jam3/package-dependency-stats/blob/master/LICENSE.md) for details.
