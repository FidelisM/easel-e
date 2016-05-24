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
const DOMExtendCommon = require('../lib/DOMExtendCommon');

function PaintBrush(width) {
  Object.defineProperty(this, "width", { get: () => width, configurable: false, enumerable: false });
  ToolExtend.call(this, 'paintbrush');

  let icon = Icon('fa-paint-brush');
  DOMExtendCommon.call(this, icon);
}

/**
 * The bind function should be overridden by every
 * tool. The function binds its routines/what to do with the Canvas context
 * when it is the selected tool. The binding occurs, every time a layer changes
 * or every time the tool changes.
 *
 * @param  {DrawingLayer} context the DrawingLayer that the tool will act on
 * @return {Tool}         this Tool for chaining
 */
PaintBrush.prototype.bind = function (drawingLayer) {
  let context = drawingLayer.ctx;

  return this;
}

module.exports = PaintBrush;

