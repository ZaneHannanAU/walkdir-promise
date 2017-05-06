# walkdir-promise

Promise based directory walking.

## Installation

```shell
npm install --save walkdirp
```

## Demo

```JavaScript
var { homedir } = require('os')
,      walkdirp = require('walkdirp')
,          opts = { dir: homedir(), depth: 1 }

walkdirp.oTree(opts)
.then(list => console.dir(list)) // Wowza!
.catch(console.error)

walkdirp.aTree(opts)
.then(list => console.dir(list)) // Wowza!
.catch(console.error)
```

### ES6

```JavaScript
var { homedir } = require('os')
,      walkdirp = require('walkdirp')

async function oTree(options) {
	var tree;
	try {
		tree = await walkdirp.oTree(options)
	} catch (e) {
		console.error(e);
		return;
	} finally {
		return list
	}
}

async function aTree(options) {
	var tree;
	try {
		tree = await walkdirp.aTree(options)
	} catch (e) {
		console.error(e);
		return;
	} finally {
		return list
	}
}

console.dir([
	aTree({ dir: homedir(), depth: 3 }),
	oTree({ dir: homedir(), depth: 3 })
])
```

## Notes

`walkdirp`, `walkdirp.Array` and `walkdirp.aTree` are all the exact same (circular).

`walkdirp.oTree` and `walkdirp.Object` are the same as well.

## Extras


+ Ignoring by name can be done in-line via the `ignore` option:

	```JavaScript
	walkdirp({
		dir: require('os').homedir(),
		ignore: ['Games', 'Downloads', 'Calibre Library', 'Trash']
	})
	```

	It force disables scanning of `node_modules` by default.
+ dotfiles disabled by default. Enable:

	```JavaScript
	walkdirp({
		dir: require('os').homedir(),
		dotfiles: true // dotfiles visible
	}) // woah
	```
+ Filtering can be done in-line via the `filter` option:

	```JavaScript
	walkdirp({
		dir: require('os').homedir(),
		filter: /* an array filtration function */ name => !/^\./.test(name)
	})
	```

	It is closely replicated via the `ignore` option, however may prove useful in searching for a single dir instead of just excluding a few.
+ Can modify tokens in-line via the `map` option (`Object`/`oTree` only):

	```JavaScript
	var mime = require('mime')
	walkdirp.Object({
		dir: home,
		map: res => {
			res.children.map(o => {
				o.type = mime.lookup(o.path)
			})
			return res
		}
	})
	```
