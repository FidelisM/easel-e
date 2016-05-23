/**
 * Here is the ToolKit that will be represented on the
 * left side of the Graphical User Interface.
 *
 * The idea of the ToolKit is to give users their own set of
 * tools that they can use for designing and drawing. i.e. Pencil, brushes,
 * crop tools, etc.
 *
 * The ToolKit is ideally an array of Tools that are clickable. They each
 * have their own functionality and can inherit from a common tool if we find
 * that that is necessary and that all tools share a common functionality.
 *
 * We should store a function that can respond to click events on
 * the ToolKit. This way, when the user clicks ("picks up") a Tool from the ToolKit,
 * we can activate that Tool for the user and decactivate ("set down") whatever the current
 * Tool the user is using.
 *
 * Typically here, the user can only use one tool at a time. So when the user
 * want's to select a Tool from the ToolKit, they "put down" the previous Tool
 * that they were "holding."
 *
 */
const Immutable = require('immutable');

function ToolKit(width, height) {
  this.width = width;
  this.height = height;

  /**
   * These are statically defined properties of the toolkit that
   * should not be changed from outside of the
   */
  this._toolkit = document.createElement('div');
  this._toolkit.classList.add('toolkit');
  this._toolkit.style.backgroundColor = '#999999';
  this._toolkit.style.height = height + 'px';
  this._toolkit.style.width =  width + 'px';
  this._toolkit.style.position = 'absolute';
  this._toolkit.style.left = '0';
  this._toolkit.style.zIndex = '999';

  this._tools = Immutable.List();
};

ToolKit.prototype.resize = function (width, height) {
  this.width = width;
  this.height = height;
  this._toolkit.style.height = height + 'px';
  this._toolkit.style.width = width + 'px';
  return this;
};

/**
 * Append the ToolKits's _toolkit DOM element to the DOM element invoked as an argument of the function.
 * The {DOMElement} element (arg1) will become the parent element of this._layer.
 *
 * @param  {DOMElement} element the element that this._toolkit will be appended to
 * @return {ToolKit}         this
 */
ToolKit.prototype.appendTo = function (element) {
  element.appendChild(this._toolkit);
  return this;
};

/**
 * Add a single tool to the ToolKit.
 * @param {[type]} tool [description]
 */
ToolKit.prototype.addTool = function (tool) {
  if (tool._type !== 'tool') throw new Error('cannot add non tool to the -toolkit');
  this._tools.push(tool);
  this._toolkit.appendChild(tool.icon);
  return this;
};

/**
 * Basically a function that acts as a setter for "picking up"
 * a tool from the ToolKit.
 *
 * @return {Tool}
 */
ToolKit.prototype.pickup = function () {

};

ToolKit.prototype.putdown = function () {

};

module.exports = ToolKit;