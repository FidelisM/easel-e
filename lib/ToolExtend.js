function applyUnSelection(node) {
  node.classList.remove('selected');
  node.style.backgroundColor = '#CCCCCC';
}

function applySelection(node) {
  node.classList.add('selected');
  node.style.backgroundColor = '#EEEEEE';
}
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
  // Type of the object. in the case of the tools, they'll always be a type tool
  Object.defineProperty(this, "_type", { get: () => 'Tool' });
  // The name of the tool you are creating. in this case, it uses the name parameter
  Object.defineProperty(this, "_name", { get: () => name });
  // When the tool is picked up, what should it do?
  Object.defineProperty(this, "onPickup", {
    configurable: false,
    set: function (fn) {
      if (!this.node) throw new Error('cannot set a pickup for an icon that doesn\'t exist');
      this.node.onclick = function onclick() {
        fn.apply(this, arguments);
      };
    }
  });

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

  let _added = false;
  Object.defineProperty(this, "added", {
    get: () => _added,
    set: (bool) => _added = true,
    configurable: false,
    enumerable: false
  });

  /**
   * The bind function should be overridden by every
   * tool. The function binds its routines/what to do with the Canvas context
   * when it is the selected tool. The binding occurs, every time a layer changes
   * or every time the tool changes.
   *
   * @param  {DrawingLayer} context the DrawingLayer that the tool will act on
   * @return {Tool}         this Tool for chaining
   */
  this.__proto__.bind = function (layerStack) {
    if (!this.events) throw new Error('you must define the events for the tool before you can bind/unbind, see PaintBrush line:58 for an example.');
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
  this.__proto__.unbind = function (layerStack) {
    if (!this.events) throw new Error('you must define the events for the tool before you can bind/unbind, see PaintBrush line:58 for an example.');
    let {node, ctx} = layerStack.activeLayer;
    this.events().forEach((e) => node.removeEventListener(e[0], e[1].bind(ctx)));
    brush.reset();
    return this;
  }
};

module.exports = ToolExtend;
