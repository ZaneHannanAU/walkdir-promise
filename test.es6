const walkdirp = require('./')
,  { homedir } = require('os')
,         opts = { dir: homedir(), depth: 1 };


async function oTree(options) {
	var tree;
	try {
		tree = await walkdirp.oTree(options);
	} catch (e) {
		console.error(e);
		return {err: e};
	} finally {
		// do stuff
		return tree
	}
}

async function aTree(options) {
	var tree;
	try {
		tree = await walkdirp.aTree(options);
	} catch (e) {
		console.error(e);
		return {err: e};
	} finally {
		// do stuff
		return tree
	}
}

Promise.all([aTree(opts),oTree(opts)])
.then(tree => console.dir(tree, {colors: true, depth: 5})) // Wowza!
.catch(console.error)
