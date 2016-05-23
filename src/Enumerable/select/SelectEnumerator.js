/**
 * @file Defines the ConcatEnumerator used to iterate through collections created by a select operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a select operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} source - A sequence of values to invoke a transform function on.
 * @param {Function} selector - A transform function to apply to each element.
 */
function SelectEnumerator(source, selector) {
	this._enumerator = source.getEnumerator();
	this._selector = selector;
	this.reset();
}

/** @this SelectEnumerator 
 * Gets the current element in the collection.
 * @returns {*} The current element in the collection.
 */
SelectEnumerator.prototype.getCurrent = function() {
	var current = this._enumerator.getCurrent();
	return this._selector.call(current, current, this._index);
};

/** @this SelectEnumerator 
 * Advances the enumerator to the next element of the collection.
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
SelectEnumerator.prototype.moveNext = function() {
	this._index++;
	return this._enumerator.moveNext();
};

/** @this SelectEnumerator 
 * Sets the enumerator to its initial position, which is before the first element in the collection.
 */
SelectEnumerator.prototype.reset = function() {
	this._enumerator.reset();
	this._index = -1;
};