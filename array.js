var fs = require('fs')
, path = require('path');

const aTree = module.exports = ({
  dir,
  ignore = new Set(['node_modules']),
  dotfiles = false,
  depth = Infinity,
  child = false
}) => new Promise((resolve, reject) => {
  var results = [];
  if (!child && !(ignore instanceof Set || ignore.has('node_modules')))
    ignore = new Set([...ignore, 'node_modules']);

  fs.readdir(dir, (err, list) => {
    if (err) return reject(err)

    var pending = list.length;
    if (!pending)
      return resolve(results);
    list.forEach(file => {
      if (!dotfiles && file.charAt(0)=='.') {

        if (!--pending)
          return resolve(results);
      } else if (ignore.has ? ignore.has(file) : ignore.includes(file)) {

        if (!--pending)
          return resolve(results);
      } else {
        fs.stat(path.join(dir, file)).then(stat => {
          if (stat && stat.isDirectory()) {
            if (depth) {
              aTree({
                  dir: path.join(dir, file),
                  depth: depth-1,
                  child: true,
                  ignore,
                  dotfiles
              }).then(res => {
                results = results.concat(res);
                if (!--pending)
                  resolve(results);
                return;
              }, reject);
            } else {
              results.push(path.join(dir, file))
            }
            return;
          } else {
            results.push(path.join(dir, file));
            if (!--pending)
              return resolve(results);
          }
        });
      }
    });
  })
});
