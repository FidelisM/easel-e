/**
 * The paintbrush is a tool that allows the user
 * to draw on a layer. It is a brush so we will also
 * want to consider different options for adding different brush stokes,
 * types, widths, and effects to the brush.
 *
 * For the first implementation, we will only add brush width as an option
 * to the brush. Although we talked about different effects, we want to keep
 * it simple so we can work through more tools than just a brush.
 *
 * The brush will have sub options to select from so that the user
 * can modify their brush and get the correct type of effect applied
 * to the layer they are looking to work with.
 */

const Icon = require('./Icon');

function PaintBrush(width) {
  // The type should be super private and non modifiable.
  this._type = 'tool';

  this.icon = Icon('paintbrush');
  this._width = width;
}

module.exports = PaintBrush;

