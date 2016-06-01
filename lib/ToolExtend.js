/****** Some HELPer functions ******\

 * Assist the tool node with the styling of the icon when it is selected & unselected
 * Change:
 *  	- backgroundColor
 *  	- classList name (selected/!selected)
 */
function applyUnSelection(node) { node.classList.remove('selected'); node.style.backgroundColor = '#CCCCCC'; }

function applySelection(node) { node.classList.add('selected'); node.style.backgroundColor = '#EEEEEE'; }

/**
 * Function that will be used for easily extending
 * a tool and giving it the most common functionality that
 * one would desire for a tool. The basic boiler plate.
 * We can continue to add universal functionality to this
 * code and hope to extend all of our tools functionality as we continue
 * to work.
 *
 * @param  {String} name the name of the tool
 */
function ToolExtend(name) {
  /*******************************************************\
   * Define the basic tool properties
   * such as x-position, y-position, fillStyle, mouse1down
   *
   * We will continue to add to these
   * if there are more generic properties in the future.
  \*******************************************************/

  // The name of the tool you are creating. in this case, it uses the name parameter
  Object.defineProperty(this, '_name', { get: () => name });

  /*\
   * The x-position of the tool
   * @type {Number}
  \*/
  let _x = null;
  Object.defineProperty(this, 'x', { get: () => _x, set: (newX) => { this.moveX = _x; _x = newX; }, enumerable: false });

  /*\
   * The y-position of the tool
   * @type {Number}
  \*/
  let _y = null;
  Object.defineProperty(this, 'y', { get: () => _y, set: (newY) => { this.moveY = _y; _y = newY}, enumerable: false });

  /*\
   * The x-movement of the tool
   * @type {Number}
  \*/
  let _moveX = null;
  Object.defineProperty(this, 'moveX', { get: () => _moveX, set: (newMoveX) => _moveX = newMoveX, enumerable: false });

  /*\
   * The y-movement of the tool
   * @type {Number}
  \*/
  let _moveY = null;
  Object.defineProperty(this, 'moveY', { get: () => _moveY, set: (newMoveY) => _moveY = newMoveY, enumerable: false });

  /*\
   * The fillStyle for the tool.
   * In the future we can set this up so that
   * we can check that the user is setting the
   * fillStyle to a correct value before setting and
   * not allow them to set it if it is improper.
   * @type {String}
  \*/
  let _fillStyle = 'black';
  Object.defineProperty(this, 'fillStyle', { get: () => _fillStyle, set: (newFillStyle) => _fillStyle = newFillStyle, enumerable: false });


  // When the tool is picked up, what should it do?
  Object.defineProperty(this, 'onPickup', {
    configurable: false,
    set: function (fn) {
      if (!this.node) throw new Error('cannot set a pickup for an icon that doesn\'t exist');
      this.node.onclick = function onclick() {
        fn.apply(this, arguments);
      };
    }
  });

  /*\
   * The selected property defines
   * wether or not the tool is the currently
   * selected tool in the Toolkit.
   *
   * If the tool is not currently selected
   * then the property should be false, to let
   * other objects understand that it should not
   * be concerned with this tool because it's
   * not selected
   *
   * @type {Boolean}
  \*/
  let _selected = false;
  Object.defineProperty(this, 'selected', {
    get: () => _selected,
    set: (val) => {
      if (val !== true || val !== false) {}
      else throw new Error('select must be assigned a boolean value');

      if (!val)
        applyUnSelection(this.node);
      else
        applySelection(this.node);

      _selected = val
    },
    configurable: false,
    enumerable: true
  });
}

// Type of the object. in the case of the tools, they'll always be a type tool
Object.defineProperty(ToolExtend.prototype, '_type', { get: () => 'Tool' });

/*\
 * The added property defines
 * wether or not the tool has been added
 * to the ToolKit.
 *
 * Basically every tool should be set to true for
 * now because we are adding all the tools to the
 * ToolKit. This is not set to true until the ToolKit
 * runs ToolKit.addTool(myTool) where myTool.added then
 * is equal to true.
 *
 * Since this is configurable,
 * we can later set the ToolKit up
 * for the user to modify and alter on their
 * own.
 *
 * @type {Boolean}
\*/
let _added = false;
Object.defineProperty(ToolExtend.prototype, 'added', {
  get: () => _added,
  set: (bool) => _added = true,
  configurable: true,
  enumerable: false
});

/*\
 * The bind function should be overridden by every
 * tool. The function binds its routines/what to do with the Canvas context
 * when it is the selected tool. The binding occurs, every time a layer changes
 * or every time the tool changes.
 *
 * @param  {LayerStack} layerStack the layerStack that the tool will act on
 * @return {Tool}         this Tool for chaining
\*/
ToolExtend.prototype.bind = function (layerStack) {
  if (!this.events) throw new Error('you must define the events for the tool before you can bind/unbind, see PaintBrush line:58 for an example.');
  let {node, ctx} = layerStack.activeLayer;
  this.events().forEach((e) => node.addEventListener(e[0], e[1].bind(ctx)));
  this.reset();
  return this;
}

/*\
 * The unbind function should remove all the eventListeners that
 * were previously registered to the canvas layer and then reset the
 * brush back to it's default settings which is undefined.
 * @param  {LayerStack} layerStack the layerStack which to unbind from
 * @return {PaintBrush}              the current PaintBrush being referred to
\*/
ToolExtend.prototype.unbind = function (layerStack) {
  if (!this.events) throw new Error('you must define the events for the tool before you can bind/unbind, see PaintBrush line:58 for an example.');
  let {node, ctx} = layerStack.activeLayer;
  this.events().forEach((e) => node.removeEventListener(e[0], e[1].bind(ctx)));
  this.reset();
  return this;
}

/********* some HELPer functions *********/

/**
 * Reset the tool to null settings
 * and back to empty
 */
ToolExtend.prototype.reset = function () {
  this.x = null;
  this.y = null;
  this.moveX = null;
  this.moveY = null;
  this.mouse1down = false;
  return this;
};

/**
 * Setup the tool with coordinates and mousedown switch
 * @param  {Event} e
 */
ToolExtend.prototype.setup = function (e) {
  this.x = e.offsetX;
  this.y = e.offsetY;
  this.mouse1down = e.buttons === 1;

  this.debug();

  return this;
};

/**
 * Debug the tool to the console for helpful info related to movement
 * and position of the tool.
 */
ToolExtend.prototype.debug = function () {
  console.log(
    'Mouse1Down: ' + this.mouse1down + '\n' +
    'Position (x,y): (' + this.x + ',' + this.y +')\n' +
    'Movement (x,y): (' + this.moveX + ',' + this.moveY + ')'
  );
}

module.exports = ToolExtend;
