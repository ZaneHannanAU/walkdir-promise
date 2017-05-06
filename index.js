
module.exports = module.exports.Array = module.exports.aTree = require('./object');

module.exports.Object = module.exports.oTree = require('./array');

/* Terminology:
 * !--pending: Triggers if zero after decrementing value.
 * == vs === : dotfiles act odd with '.charAt(0)' so it just ensures correct.
 */
