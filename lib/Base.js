/**
 * Base - The engine that drives easel-e
 *
 * There are moving parts of the application, except this one. All parts of the
 * application will derive some how or another from the base. These small functions
 * are used to be combined to make functional pieces of the program. Each of the
 * responsibilites that are within the base are in fact based off of having a single
 * responsiblity, allowing resuability within the base and less code needed to be
 * written outside of the base. A heavy dose of the eventing and user interface
 * is comprised in the drawing layer and in the toolkit, while each of the smaller
 * features of the application will be found in their own modules.
 */

/**
 * @namespace Easel
 */

var Easel = window.Easel || (window.Easel = {});

