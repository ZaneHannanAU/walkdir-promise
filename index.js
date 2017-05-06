const array = require('./array')
,    object = require('./object')

module.exports = array;
module.exports.Array = array;
module.exports.aTree = array;

module.exports.Object = object;
module.exports.oTree = object;

/* Terminology:
 * !--pending: Triggers if zero after decrementing value.
 * == vs === : dotfiles act odd with '.charAt(0)' so it just ensures correct.
 */

// For testing:
// console.dir(module.exports, {colors: true, depth: Infinity})
