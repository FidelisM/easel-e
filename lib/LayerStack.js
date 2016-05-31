const Immutable = require('immutable');
const EventEmitter = require('fbemitter/lib/BaseEventEmitter');
const DOMExtendCommon = require('./DOMExtendCommon');
/**
 * LayerStack will be the Layer manager process.
 * It contains an Immutable.Stack reference that can be modified via
 * prototypical methods that will be written. The main functions will be
 * add, delete, moveUp, moveDown, mergeDown, and then more if we can think
 * of more to add to the stack.
 *
 * It's job will be to manage and perform actions on the different layers that have been
 * added to the current Drawing by the User.
 *
 * It only accepts drawing Layers as it's types to add to the stack.
 * And although it's called a stack, the inner reference will be a List so that
 * Users can remove Layers from the middle and other areas that aren't at the top
 * of the stack. This will allow users, to remove a layer from wherever they
 * wish and have more capabilities than to only go from the top down
 * as a typical stack would be used.
 *
 * NOTE: When we think of the layers of a design, they are
 * from the top down. That is why it's called LayerStack.
 */
function LayerStack(width, height) {
  let _stackList = Immutable.List();
  Object.defineProperty(this, 'stackList', { configurable: false, enumerable: false, get: () => _stackList, set: (newList) => _stackList = newList });

  width = parseInt(width); height = parseInt(height);
  Object.defineProperty(this, 'width', { get: () => width, configurable: false });
  Object.defineProperty(this, 'height', { get: () => height, configurable: false });

  let _activeLayer = null;
  Object.defineProperty(this, 'activeLayer', {
    get: () => _activeLayer,
    set: (newLayer) => {
      if (newLayer._type !== 'DrawingLayer') throw new Error('you cannot set the activeLayer to a non DrawingLayer Object type');
      //set _activeLayer to become _lastLayer
      if (_activeLayer && _activeLayer._type === 'DrawingLayer') this.lastLayer = _activeLayer;
      // set new layer to be the active layer
      newLayer.active = true;
      // point _active layer to the newly active layer.
      _activeLayer = newLayer;
    }
  });

  let _lastLayer = null;
  Object.defineProperty(this, 'lastLayer', {
    get: () => _lastLayer,
    set: (oldLayer) => {
      if (oldLayer._type !== 'DrawingLayer') throw new Error('you cannot set the lastLayer to a non DrawingLayer Object type');
      oldLayer.active = false;
      _lastLayer = oldLayer;
    }
  })

  // The zIndex will define the layer level of each layer added to the application;
  // Everytime the _zIndex is accessed, it gains 1 unit. Making the layers
  // zIndex increase each time they're added.
  // We will also need to think about how they should be organized when
  // the user would like to move the layers up/down and merge them.
  let _zIndex = 10;
  Object.defineProperty(this, 'zIndex', { get: () => _zIndex++ });

  this.__token = null;
  this.__emitter = new EventEmitter();

  let _layerStack = document.createElement('div');
  _layerStack.classList.add('layer-stack');
  _layerStack.style.position = 'relative';
  _layerStack.style.float = 'left';
  _layerStack.style.width = width + 'px';
  _layerStack.style.height = height + 'px';
  _layerStack.style.boxSizing = 'border-box';

  DOMExtendCommon.call(this, _layerStack);
}

/**
 * Add a DrawingLayer onto the stack. When we
 * add a new layer to the stack, then that is the currently
 * active layer of all the layers.
 * The user can easily switch between layers after they have added
 * a layer if they don't want the currently added layer to be the
 * selected layer. We will implement layer switching in the future when
 * we display the list of Layers to the user in the GUI.
 *
 * @param  {DrawingLayer} layer the DrawingLayer to push onto the stack
 * @return {[type]}       [description]
 */
LayerStack.prototype.addLayer = function (layer) {
  if(layer._type !== 'DrawingLayer') throw new Error('cannot add a non DrawingLayer type to the stack of layers');

  layer
    .center(this.node)
    .appendTo(this.node);

  layer.node.style.zIndex = this.zIndex;

  this.activeLayer = layer;
  this.stackList = this.stackList.push(layer);

  this.__token = this.__emitter.emit('change', this.activeLayer, this.lastLayer);

  return this;
};

/**
 * Remove a DrawingLayer from the Layer stack. This function
 * will be implemented in the future but for now this is the empty
 * function signature.
 */
LayerStack.prototype.removeLayer = function (i) {};

/**
 * Resize the LayerStack; which is the outter wrapping HTML DOM element
 * that holds and manages all the layers of the Current drawing/design.
 *
 * During the resize, the LayerStack should center all the layers to make
 * sure that they are properly centered now that the size of the LayerStack
 * has changed.
 *
 * @param  {[type]} width  [description]
 * @param  {[type]} height [description]
 * @return {[type]}        [description]
 */
LayerStack.prototype.resize = function (width, height) {
  // resize the Layer Stack
  this.node.style.width = width + 'px';
  this.node.style.height = height + 'px';

  // resize all the children layers;
  let iter = this.stackList.values();
  let item = iter.next();
  while(!item.done) {
    item.value.center(this.node);
    item = iter.next();
  }
  return this;
}

LayerStack.prototype.onChange = function (cb) {
  if (cb instanceof Function !== true) throw new Error('callback must be passed as argument for LayerStack.onChange');
  this.__emitter.addListener('change', cb.bind(this));
};

module.exports = LayerStack;

