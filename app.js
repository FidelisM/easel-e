/**
 * The app.js constructor will populate all the necessary information
 * that we will need global to the application and manage some global
 * functions, such as updating it's properties when certain global events are
 * performed such as the window resizing;
 *
 * It will help us to define, the width, height, and many other constants
 * for the application.
 */
function App(body) {
  body.style.boxSizing = 'border-box';
  Object.defineProperty(this, 'name', { get: () => 'Easel-e' });
  Object.defineProperty(this, 'version', { get: () => '0.0.1' });
  Object.defineProperty(this, 'body', { get: () => body, configurable: false });

  let width = parseInt(body.clientWidth);
  Object.defineProperty(this, 'width', { get: () => width, set: (val) => width = val });

  let height = parseInt(body.clientHeight);
  Object.defineProperty(this, 'height', { get: () => height, set: (val) => height = val });
}

/**
 * The resize function will be called when the window is resized.
 * We have to make sure not to forget to actually
 *
 * @return {[type]} [description]
 */
App.prototype.resize = function (e) {
  this.width = parseInt(this.body.clientWidth);
  this.height = parseInt(this.body.clientHeight);
  return this;
}

module.exports = App;
