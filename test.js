var { homedir } = require('os')
,      walkdirp = require('./')
,          opts = { dir: homedir(), depth: 1 }

if (process.env.npm_package_config_object === 'true') {
	walkdirp.oTree(opts)
	.then(list => console.dir(list, { // Wowza!
		colors: true,
		depth: 4
	})).catch(console.error)
}

if (process.env.npm_package_config_array === 'true') {
	walkdirp.aTree(opts)
	.then(list => console.dir(list, { // Wowza!
		depth: 4
	}))
	.catch(console.error)
}
