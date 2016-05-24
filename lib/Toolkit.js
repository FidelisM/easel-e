const Immutable = require('immutable');
const DOMExtendCommon = require('./DOMExtendCommon');
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
function ToolKit(width, height) {
  width = parseInt(width);
  Object.defineProperty(this, 'width', { get: () => width, configurable: false });
  height = parseInt(height);
  Object.defineProperty(this, 'height', { get: () => height, configurable: false });

  /**
   * These are statically defined properties of the toolkit that
   * should not be changed from outside of the class.
   */
  let _toolkit = document.createElement('div');
  _toolkit.classList.add('toolkit');
  _toolkit.style.backgroundColor = '#999999';
  _toolkit.style.height = this.height + 'px';
  _toolkit.style.width =  this.width + 'px';
  _toolkit.style.position = 'relative';
  _toolkit.style.float = 'left';
  _toolkit.style.zIndex = '9999';
  _toolkit.style.boxShadow = '0 0 10px 0 #AAAAAA';
  _toolkit.style.border = '1px solid #999999';
  _toolkit.style.boxSizing = 'border-box';

  DOMExtendCommon.call(this, _toolkit);

  let _toolSet = Immutable.Set();
  Object.defineProperty(this, 'toolSet', { get: () => _toolSet, set: (newSet) => _toolSet = newSet, configurable: false });

  let _currentTool = null;
  Object.defineProperty(this, 'currentTool', {
    get: () => _currentTool,
    set: (newTool) => {
      if(newTool._type !== 'Tool') throw new Error('cannot set the current tool to a type that is not of Tool');
      if(_currentTool && _currentTool._type === 'Tool') _currentTool.selected = false;
      newTool.selected = true;
      _currentTool = newTool;
    }
  })
};

/**
 * Resize the Toolkit. For this function, only the height will be
 * resizable for now at this point. At some point, we can decide if we'd like
 * to allow the user to be able to resize the width of the Toolkit by giving
 * them a <-> cursor to display that they can resize the Toolkit
 *
 * @param  {Number} height the height to resize the Toolkit to
 * @return {Toolkit}        the current Toolkit instance will be returned
 */
ToolKit.prototype.resize = function (width, height) {
  this.height = height;
  this.node.style.height = height + 'px';
  return this;
};

/**
 * Add a single tool to the ToolKit.
 * @param {[type]} tool [description]
 */
ToolKit.prototype.addTool = function (tool) {
  if (tool._type !== 'Tool') throw new Error('cannot add non tool to the -toolkit');
  this.toolSet = this.toolSet.add(tool);
  this.node.appendChild(tool.node);
  tool.added = true;
  tool.onPickup = this.pickup.bind(this, tool);
  return this;
};

/**
 * Basically a function that acts as a setter for "picking up"
 * a tool from the ToolKit.
 *
 * When a tool is "picked up" then whatever the currently
 * selected tool is, is "put down." That way, we ensure that the user can only
 * ever have one tool selected at a time.
 *
 * @return {Tool}
 */
ToolKit.prototype.pickup = function (newTool) {
  this.currentTool = newTool;
};

module.exports = ToolKit;