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
  Object.defineProperty(this, "_type", { get: () => 'tool' });
  Object.defineProperty(this, "_name", { get: () => name });
  Object.defineProperty(this, "onPickup", {
    configurable: false,
    set: function (fn) {
      if (!this.icon) throw new Error('cannot set a pickup for an icon that doesn\'t exist');
      this.icon.onclick = fn.bind(this);
    }
  });
}