/**
 * The paintbrush is a tool that allows the user
 * to draw on a layer. It is a brush so we will also
 * want to consider different options for adding different brush stokes,
 * types, widths, and effects to the brush.
 *
 * For the first implementation, we will only add brush width as an option
 * to the brush. Although we talked about different effects, we want to keep
 * it simple so we can work through more tools than just a brush.
 *
 * The brush will have sub options to select from so that the user
 * can modify their brush and get the correct type of effect applied
 * to the layer they are looking to work with.
 */
const Icon = require('./Icon');
const ToolExtend = require('../lib/ToolExtend');

function PaintBrush(width) {
  ToolExtend.call(this, 'paintbrush');

  Object.defineProperty(this, "width", {
    get: () => width,
    configurable: false,
    enumerable: false
  });

  let icon = Icon('fa-paint-brush');
  Object.defineProperty(this, "icon", {
    get: () => icon,
    configurable: false,
    enumerable: false
  });
}

/**
 * On pickup describes the event, when a tool is picked up.
 * We can eventually add functionality, for more than when the tool
 * is clicked, but for now we only want to pickup a tool when it is clicked.
 * Again, I can't stress the case for trying to keep this super simple
 * at first and then add more and more functionality as soon as we
 * get a minimal viable product.
 * @param  {Function} fn function to run when the tool is "picked up" or clicked...
 * @return {Tool}      returns the Tool after for chaining.
 */
// PaintBrush.prototype.onPickup = function (fn) {
//   this.icon.onclick = fn.bind(this);
//   return this;
// };

module.exports = PaintBrush;

