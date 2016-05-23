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
module.exports = function ToolExtend(name) {
  // Type of the object. in the case of the tools, they'll always be a type tool
  Object.defineProperty(this, "_type", { get: () => 'tool' });
  // The name of the tool you are creating. in this case, it uses the name parameter
  Object.defineProperty(this, "_name", { get: () => name });
  // When the tool is picked up, what should it do?
  Object.defineProperty(this, "onPickup", {
    configurable: false,
    set: function (fn) {
      if (!this._dom) throw new Error('cannot set a pickup for an icon that doesn\'t exist');
      this._dom.onclick = fn.bind(this);
    }
  });

  let _added = false;
  Object.defineProperty(this, "added", {
    get: () => _added,
    set: (bool) => _added = true,
    configurable: false,
    enumerable: false
  });
};