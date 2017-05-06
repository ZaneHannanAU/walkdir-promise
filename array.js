var fs = require('fs')
, path = require('path');

const aTree = module.exports = ({
  dir,
  ignore = new Set(['node_modules']),
  dotfiles = false,
  depth = Infinity,
  child = false,
  filter
}) => new Promise((resolve, reject) => {
  var results = [
    // Big nothing at the start I guess.
  ];

  if (!child && !(ignore instanceof Set || ignore.has('node_modules')))
    ignore = new Set([...ignore, 'node_modules']);

  fs.readdir(dir, (err, list) => {
    if (err) return reject(err);

    if (typeof filter === 'function')
      list = list.filter(filter);

    var pending = list.length;
    if (!pending)
      return resolve(results);

    list.forEach(file => {
      if (!dotfiles && file.charAt(0)=='.') {

        if (!--pending)
          resolve(results);
        return;
      } else if (ignore.has(file)) {

        if (!--pending)
          resolve(results);
        return;
      } else {
        fs.stat(path.join(dir, file), (err, stat) => {
          if (err) return reject(err);

          if (stat && stat.isDirectory()) {
            if (depth > 0) {
              aTree({
                dir: path.join(dir, file),
                depth: depth-1,
                child: true,
                ignore,
                dotfiles,
                filter
              }).then(res => {
                results = results.concat(res);
                if (!--pending)
                  resolve(results);
                return;
              }, reject);
            } else {
              results.push(path.join(dir, file))
              if (!--pending)
                resolve(results);
              return;
            }
            return;
          } else {
            results.push(path.join(dir, file));
            if (!--pending)
              resolve(results);
            return;
          }
        });
      }
    });
  })
});
