/**
 * Here is the Toolkit that will be represented on the
 * left side of the Graphical User Interface.
 *
 * The idea of the Toolkit is to give users their own set of
 * tools that they can use for designing and drawing. i.e. Pencil, brushes,
 * crop tools, etc.
 *
 * The Toolkit is ideally an array of Tools that are clickable. They each
 * have their own functionality and can inherit from a common tool if we find
 * that that is necessary and that all tools share a common functionality.
 *
 * We should store a function that can respond to click events on 
 * the Toolkit. This way, when the user clicks ("picks up") a Tool from the Toolkit,
 * we can activate that Tool for the user and decactivate ("set down") whatever the current
 * Tool the user is using.
 *
 * Typically here, the user can only use one tool at a time. So when the user
 * want's to select a Tool from the Toolkit, they "put down" the previous Tool
 * that they were "holding." without having a choice.
 *
 */
function Toolkit() {

}

/**
 * Basically a function that acts as a getter for "picking up"
 * a tool from the Toolkit.
 *
 * @return {Tool}
 */
Toolkit.prototype.pickup = function () {

}

Toolkit.prototype.putdown = function () {

}

module.exports = Toolkit;