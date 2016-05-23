const Immutable = require('immutable');
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
  let stackList = Immutable.List();
  Object.defineProperty(this, 'stackList', { configurable: false, enumerable: false, get: () => stackList, set: (newList) => stackList = newList });

  width = parseInt(width); height = parseInt(height);
  Object.defineProperty(this, 'width', { get: () => width, configurable: false });
  Object.defineProperty(this, 'height', { get: () => height, configurable: false });

  let layerStack = document.createElement('div');
  layerStack.classList.add('layer-stack');
  layerStack.style.position = 'relative';
  layerStack.style.float = 'left';
  layerStack.style.width = width + 'px';
  layerStack.style.height = height + 'px';
  layerStack.style.boxSizing = 'border-box';

  DOMExtendCommon.call(this, layerStack);
}

/**
 * Add a DrawingLayer onto the stack
 * @param  {DrawingLayer} layer the DrawingLayer to push onto the stack
 * @return {[type]}       [description]
 */
LayerStack.prototype.addLayer = function (layer) {
  if(layer._type !== 'DrawingLayer') throw new Error('cannot add a non DrawingLayer type to the stack of layers');

  layer
    .center(this.node)
    .appendTo(this.node);

  this.stackList = this.stackList.push(layer);

  return this;
};

/**
 * Remove a DrawingLayer from the Layer stack
 */
LayerStack.prototype.removeLayer = function (i) {

};

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

module.exports = LayerStack;

