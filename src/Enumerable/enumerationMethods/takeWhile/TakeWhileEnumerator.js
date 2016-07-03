/**
 * @file Defines the TakeWhileEnumerator used to iterate through collections created by a takeWhile operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a takeWhile operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} source - The sequence to return elements from.
 * @param {Function} predicate - A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
 */
function TakeWhileEnumerator(source, predicate) {
	this._enumerator = source.getEnumerator();
	this._predicate = predicate;
	this.reset();
}

/** Gets the current element in the collection.
 * @this TakeWhileEnumerator
 * @returns {*} The current element in the collection.
 */
TakeWhileEnumerator.prototype.getCurrent = function() {
	if (!this._hasReachedEnd) {
		return this._enumerator.getCurrent();
	}
	else {
		throw new Error('Tried to call getCurrent() on invalid cursor position.');
	}
};

/** Advances the enumerator to the next element of the collection.
 * @this TakeWhileEnumerator
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
TakeWhileEnumerator.prototype.moveNext = function() {
	var current;
	
	this._index++;
	if (this._enumerator.moveNext()) {
		current = this._enumerator.getCurrent();
		if (this._predicate.call(current, current, this._index)) {
			return true;
		}
		else {
			this._hasReachedEnd = true;
			return false;
		}
	}
	else {
		return false;
	}
};

/** Sets the enumerator to its initial position, which is before the first element in the collection.
 * @this TakeWhileEnumerator
 */
TakeWhileEnumerator.prototype.reset = function() {
	this._enumerator.reset();
	this._index = -1;
	this._hasReachedEnd = false;
};