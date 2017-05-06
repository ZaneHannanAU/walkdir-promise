;;const os = require('os')
,     opts = { dir: os.homedir(), depth: 1 }
, walkdirp = require('./');

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
