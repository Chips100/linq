/**
 * @file Defines the SkipWhileEnumerator used to iterate through collections created by a skipWhile operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a skipWhile operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} source - An Enumerable to return elements from.
 * @param {Function} predicate - A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
 */
function SkipWhileEnumerator(source, predicate) {
	this._enumerator = source.getEnumerator();
	this._predicate = predicate;
	this.reset();
}

/** Gets the current element in the collection.
 * @this SkipWhileEnumerator
 * @returns {*} The current element in the collection.
 */
SkipWhileEnumerator.prototype.getCurrent = function() {
	return this._enumerator.getCurrent();
};

/** Advances the enumerator to the next element of the collection.
 * @this SkipWhileEnumerator
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
SkipWhileEnumerator.prototype.moveNext = function() {
	var current;
	
	if (!this._hasSkippedFirstElements) {
		this._hasSkippedFirstElements = true;
		
		while(this._enumerator.moveNext()) {
			this._index++;
			current = this._enumerator.getCurrent();
			if (!this._predicate.call(current, current, this._index)) {
				return true;
			}
		}
		
		return false;
	}
	else {
		return this._enumerator.moveNext();
	}
};

/** Sets the enumerator to its initial position, which is before the first element in the collection.
 * @this SkipWhileEnumerator
 */
SkipWhileEnumerator.prototype.reset = function() {
	this._enumerator.reset();
	this._hasSkippedFirstElements = false;
	this._index = -1;
};