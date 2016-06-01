function printEvent(e) {
  console.log('Button Info:\n\tbutton: ' + e.button +'\n\tbuttons: ' + e.buttons +
    '\nClient:\n\tclientX: ' + e.clientX + '\n\tclientY: ' + e.clientY +
    '\nLayer:\n\tlayerX: ' + e.layerX + '\n\tlayerY: ' + e.layerY +
    '\nMovement:\n\tmovementX: ' + e.movementX + '\n\tmovementY: ' + e.movementY +
    '\nOffset:\n\toffsetX: ' + e.offsetX + '\n\toffsetY: ' + e.offsetY +
    '\nPage:\n\tpageX: ' + e.pageX + '\n\tpageY: ' + e.pageY +
    '\nScreen:\n\tscreenX: ' +  e.screenX + '\n\tscreenY: ' + e.screenY);
}

module.exports = {
  printEvent: printEvent
};