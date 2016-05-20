/**
 * A Drawing Layer for the user.
 *
 * This Object consists of an HTML5 canvas element
 * which will allow the user to interact with our application
 * and draw/edit whatever images they would like.
 */
function DrawingLayer(height, width, color) {
  this._height = parseInt(height);
  this._width = parseInt(width);
  this._layer = document.createElement('canvas');
  this._layer.style.position = "absolute";
  this._layer.style.height = this._height + "px";
  this._layer.style.width = this._width + "px";

  // We will statically set this to white for now,
  // but in the future we should plan to have the user select
  // a color/transparent/etc.
  this._layer.style.backgroundColor = color || "#FFFFFF"

  return this;
}

/**
 * Hide the DrawingLayer's canvas element.
 * @return {DrawingLayer}
 */
DrawingLayer.prototype.hide = function () {
  this._layer.style.display = "none";
  return this;
}

/**
 * Show the DrawingLayer's canvas element.
 * @return {DrawingLayer}
 */
DrawingLayer.prototype.show = function () {
  this._layer.style.display = "block";
  return this;
}

/**
 * Center the DrawingLayer relative to the parent element that
 * is passed to the function invocation.
 *
 * @param  {DOMElement} element that this._layer will be centered, relative to.
 * @return {DrawingLayer}        this
 */
DrawingLayer.prototype.center = function (element) {
  let width = parseInt(element.style.width) || element.clientWidth;
  let height = parseInt(element.style.height) || element.clientHeight;

  let centerX = width/2;
  let centerY = height/2;

  this._layer.style.left = (centerX - this._width/2) + "px";
  this._layer.style.top = (centerY - this._height/2) + "px"

  return this;
}

/**
 * Append the DrawingLayer's inner _layer DOM element property to the DOM element invoked as an argument of the function.
 * The {DOMElement} element (arg1) will become the parent element of this._layer.
 *
 * @param  {DOMElement} element the element that this._layer will be appended to
 * @return {DrawingLayer}         this
 */
DrawingLayer.prototype.appendTo = function (element) {
  element.appendChild(this._layer);
  return this;
}

module.exports = DrawingLayer;