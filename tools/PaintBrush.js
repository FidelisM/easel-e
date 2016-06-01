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

function PaintBrush(size = 2) {
  let icon = Icon('fa-paint-brush');
  DOMExtendCommon.call(this, icon);

  let _size = size;
  Object.defineProperty(this, 'size', { get: () => _size, set: (newSize) => _size = size, configurable: true, enumerable: false });
  ToolExtend.call(this, 'paintbrush');

  this.reset();
}

// Circle derives from Shape
PaintBrush.prototype = Object.create(ToolExtend.prototype);
PaintBrush.prototype.constructor = PaintBrush;

PaintBrush.prototype.draw = function (ctx) {
  const brush = this;

  if (brush.mouse1down) {
    ctx.beginPath();
    ctx.moveTo(brush.x, brush.y);
    ctx.arcTo(brush.moveX, brush.moveY, brush.x, brush.y, 0);
    ctx.stroke();
  }
};

/**
 * The different event functions for the PaintBrush
 * when it is bound and unbound these will be passed through a function
 * to add/remove them from the listener.
 *
 * `this` will referr to the canvasGraphics2D context inside each function
 * from below.
 *
 * The Tool.bind function runs something like:
 * 		canvas.addEventListener('event', eventFn.bind(canvas.getContext('d2')))
 *
 * So that the 2d context is referred to as the `this` scope.
 *
 * @return {Array}
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
      brush
        .setup(e)
        .draw(this);
    }],

    /**
     * When the mouse moves, we want to figure out if the mouse1 button is
     * down and if the mouse 1 button is down,
     * then we want to draw on the currently active layer.
     * @param  {Event} e the mouse event
     * @return {[type]}   [description]
     */
    ['mousemove', function (e) {
      brush
        .setup(e)
        .draw(this);
    }],

    /**
     * When the brush leaves the layer, all we want to do is run
     * setup function for now to configure the brush's paramenters
     * i.e. x,y,mouse1down
     * @param  {Event} e the mouse Event
     */
    ['mouseleave', (e) => brush.setup(e)],

    ['mouseup', (e) => brush.setup(e)]
  ];
};

module.exports = PaintBrush;

