/**
 * @file Defines the SkipEnumerator used to iterate through collections created by a skip operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a skip operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} source - An Enumerable to return elements from.
 * @param {Number} count - The number of elements to skip before returning the remaining elements.
 */
function SkipEnumerator(source, number) {
	this._enumerator = source.getEnumerator();
	this._number = number;
	this.reset();
}

/** @this SkipEnumerator 
 * Gets the current element in the collection.
 * @returns {*} The current element in the collection.
 */
SkipEnumerator.prototype.getCurrent = function() {
	return this._enumerator.getCurrent();
};

/** @this SkipEnumerator 
 * Advances the enumerator to the next element of the collection.
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
SkipEnumerator.prototype.moveNext = function() {
	if (!this._hasSkippedFirstElements) {
		this._hasSkippedFirstElements = true;
		for (var i = this._number; i > 0; i--) {
			this._enumerator.moveNext();
		}
	}
	
	return this._enumerator.moveNext();
};

/** @this SkipEnumerator 
 * Sets the enumerator to its initial position, which is before the first element in the collection.
 */
SkipEnumerator.prototype.reset = function() {
	this._enumerator.reset();
	this._hasSkippedFirstElements = false;
};