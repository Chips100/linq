/**
 * @file Defines the RepeatEnumerator used to iterate through collections created by a repeat operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a repeat operation.
 * @class
 * @augments Enumerator
 * @param {*} element - The value to be repeated.
 * @param {Number} count - The number of times to repeat the value in the generated sequence.
 */
function RepeatEnumerator(element, count) {
	this._element = element;
	this._count = count;
	
	this.reset();
}

/** @this RepeatEnumerator 
 * Gets the current element in the collection.
 * @returns {*} The current element in the collection.
 */
RepeatEnumerator.prototype.getCurrent = function() {
	if (this._index >= 0 && this._index < this._count) {
		return this._element;
	}
	else {
		throw new Error('Tried to call getCurrent() on invalid cursor position.');
	}
}

/** @this RepeatEnumerator 
 * Advances the enumerator to the next element of the collection.
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
RepeatEnumerator.prototype.moveNext = function() {
	return ++this._index < this._count;
};

/** @this RepeatEnumerator 
 * Sets the enumerator to its initial position, which is before the first element in the collection.
 */
RepeatEnumerator.prototype.reset = function() {
	this._index = -1;
};