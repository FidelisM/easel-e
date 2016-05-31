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
  Object.defineProperty(this, 'width', { get: () => width, configurable: false, enumerable: false });
  ToolExtend.call(this, 'paintbrush');

  let icon = Icon('fa-paint-brush');
  DOMExtendCommon.call(this, icon);

  this.reset();
}

/********* some HELPer functions *********/

/**
 * Reset the paintbrush to null settings
 * and back to empty
 */
PaintBrush.prototype.reset = function () {
  this.x = null;
  this.y = null;
  this.mouse1down = false;
};

/**
 * Setup the paintbrush with coordinates and mousedown switch
 * @param  {Event} e
 */
PaintBrush.prototype.setup = function (e) {
  this.x = e.offsetX;
  this.y = e.offsetY;
  this.mouse1down = e.buttons === 1
};


/**
 * The different event functions for the PaintBrush
 * when it is bound and unbound these will be passed through a function
 * to add/remove them from the listener.
 * @type {Array}
 */
PaintBrush.prototype.events = function () {
  const brush = this;

  return [
    /**
     * when the current layer gets a mouse down event,
     * then draw on the layer with the current selected color...
     * For Now, we are only going to be drawing black lines and we
     * will add more lines as we continue to
     * work on the toolkit paintbrush. By maybe popping up an overlay when you click
     * the paint brush.
     */
    ['mousedown', function (e) {
        brush.setup(e);
        console.log('mousedown', brush.x, brush.y, brush.mouse1down, e);
    }],

    /**
     * When the mouse moves, we want to figure out if the mouse1 button is
     * down and if the mouse 1 button is down,
     * then we want to draw on the currently active layer.
     * @param  {Event} e the mouse event
     * @return {[type]}   [description]
     */
    ['mousemove', function (e) {
      brush.setup(e);

      if (brush.mouse1down)
        console.log('mousemove', brush.x, brush.y, brush.mouse1down, e);
    }],

    /**
     * When the brush leaves the layer, all we want to do is run
     * setup function for now to configure the brush's paramenters
     * i.e. x,y,mouse1down
     * @param  {Event} e the mouse Event
     */
    ['mouseleave', function (e) {
      brush.setup(e);

    }],

    ['mouseup', function (e) {
      brush.setup(e);

      console.log('mouseup', e);
    }]
  ];
};

/**
 * The bind function should be overridden by every
 * tool. The function binds its routines/what to do with the Canvas context
 * when it is the selected tool. The binding occurs, every time a layer changes
 * or every time the tool changes.
 *
 * @param  {DrawingLayer} context the DrawingLayer that the tool will act on
 * @return {Tool}         this Tool for chaining
 */
PaintBrush.prototype.bind = function (layerStack) {
  let {node, ctx} = layerStack.activeLayer;
  this.events().forEach((e) => node.addEventListener(e[0], e[1].bind(ctx)));
  return this;
}

/**
 * The unbind function should remove all the eventListeners that
 * were previously registered to the canvas layer and then reset the
 * brush back to it's default settings which is undefined.
 * @param  {DrawingLayer} drawingLayer the drawingLayer which to apply the changes
 * @return {PaintBrush}              the current PaintBrush being referred to
 */
PaintBrush.prototype.unbind = function (layerStack) {
  let {node, ctx} = layerStack.activeLayer;
  this.events().forEach((e) => node.removeEventListener(e[0], e[1].bind(ctx)));
  brush.reset();
  return this;
}

module.exports = PaintBrush;

