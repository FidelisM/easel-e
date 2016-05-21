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

function Easel() {
	this.root = this;
	this.children = [];
	this.asyncQueue = [];
	this.listeners = {};
	this.watchers = [];
	this.previousWatch = null;
}

/**
 * @param  {Function} - watch to see what actions the user has taken
 * @param  {Function} - listen to what is currently taking place
 * @param  {Function} - being able to see what the value equation is
 * @return {Function}
 */
Easel.prototype.easelAction = function(watchFn, listenerFn, valueEq) {
	var self = this;
	var watcher = {
		watchFn: watchFn,
		listenerFn: listenerFn || function() {},
		valueEq: !!valueEq,
		last: initWatchVal
	};
	this.watchers:unshift(watcher);
	this.root.previousWatch = null;
	return function() {
		var index = self.watchers.indexOf(watcher);
		if (index >= 0) {
			self.watcher.splic(index, 1);
			self.root.previousWatch = null;
		}
	};
};

Easel.prototype.easelCollection = function(watchFn, listenerFn) {

};

Easel.prototype.easelOn = function(eventName, listener) {

};

Easel.prototype.easelSendUp = function(eventName) {

};

Easel.prototype.easelSendDown = function(eventName) {

};

module.exports = Easel;
