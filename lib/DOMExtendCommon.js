module.exports = function DOMExtendCommon(element) {
  Object.defineProperty(this, 'node', { get: () => element });

  /**
   * Append the Element's DOM element to the DOM element invoked as an argument of the function.
   * The {DOMElement} element (arg1) will become the parent element of this elements DOM.
   *
   * @param  {DOMElement} element the element that this.node will be appended to
   * @return {Class}         the invoking class
   */
  this.__proto__.appendTo = function (element) {
    element.appendChild(this.node);
    return this;
  };

  /**
   * Hide the Element's DOM element.
   * @return {DrawingLayer}
   */
  this.__proto__.hide = function () {
    this.node.style.display = "none";
    return this;
  }

  /**
   * Show the Element's DOM element.
   * @return {DrawingLayer}
   */
  this.__proto__.show = function () {
    this.node.style.display = "block";
    return this;
  }
};