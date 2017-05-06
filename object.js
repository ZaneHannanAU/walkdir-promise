var fs = require('fs')
, path = require('path');

const oTree = module.exports = ({
  dir,
  ignore = new Set(['node_modules']),
  dotfiles = false,
  depth = Infinity,
  child = false,
  filter, map
}) => new Promise((resolve, reject) => {
  var results = {
    path: dir,
    children: []// Some set up
  };
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
              oTree({
                  dir: path.join(dir, file),
                  depth: depth-1,
                  child: true,
                  ignore,
                  dotfiles,
                  filter, map
              }).then(res => {
                results.children.push(res);
                if (!--pending)
                  resolve(typeof map === 'function' ? map(results) : results);
                return;
              }, reject);
            } else {
              results.children.push({
                path: path.join(dir, file),
                isDir: true
              })
              if (!--pending)
                resolve(typeof map === 'function' ? map(results) : results);
              return;
            }
            return;
          } else {
            results.children.push({
              path: path.join(dir, file)
            })
            if (!--pending)
              resolve(typeof map === 'function' ? map(results) : results);
            return;
          }
        });
      }
    });
  });
});
