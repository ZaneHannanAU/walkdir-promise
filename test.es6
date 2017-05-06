var { homedir } = require('os')
,      walkdirp = require('./')

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
], {colors: true, depth: 3})
