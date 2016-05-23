const DOMExtendCommon = require('./DOMExtendCommon');
/**
 * A Drawing Layer for the user.
 *
 * This Object consists of an HTML5 canvas element
 * which will allow the user to interact with our application
 * and draw/edit whatever images they would like.
 */
function DrawingLayer(height, width, color) {
  width = parseInt(width); height = parseInt(height);
  Object.defineProperty(this, 'width', { get: () => width, configurable: false });
  Object.defineProperty(this, 'height', { get: () => height, configurable: false });
  Object.defineProperty(this, '_type', { get: () => 'DrawingLayer' });

  let layer = document.createElement('canvas');
  layer.style.position = "absolute";
  layer.style.height = this.height + "px";
  layer.style.width = this.width + "px";
  layer.style.boxSizing = 'border-box';

  // We will statically set this to white for now,
  // but in the future we should plan to have the user select
  // a color/transparent/etc.
  layer.style.backgroundColor = color || "#FFFFFF"

  DOMExtendCommon.call(this, layer);

  return this;
}

/**
 * Center the DrawingLayer relative to the parent element that
 * is passed to the function invocation.
 *
 * @param  {DOMElement} element that this._layer will be centered, relative to.
 * @return {DrawingLayer}        this
 */
DrawingLayer.prototype.center = function (element, offsetX, offsetY) {
  let width = parseInt(element.style.width) || element.clientWidth;
  let height = parseInt(element.style.height) || element.clientHeight;

  if (offsetX) width = width + offsetX;

  let centerX = width/2;
  let centerY = height/2;

  this.node.style.left = (centerX - this.width/2) + "px";
  this.node.style.top = (centerY - this.height/2) + "px"

  return this;
}

/**
 * When a user performs an action on
 * a layer, we need to figure out the type of action that they
 * are performing by calculating the type of Tool that is
 * currently selected by the user.
 *
 * To do this, we should wire the DrawingLayer stack up to a listener event
 * that will keep track of what action the user is currently performing
 * when they do a mouse down event, etc.
 */
DrawingLayer.prototype.action = function (e) {
  console.log(e);
}


module.exports = DrawingLayer;