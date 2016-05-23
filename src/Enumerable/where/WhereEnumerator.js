/**
 * @file Defines the WhereEnumerator used to iterate through collections created by a where operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a where operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} source - An Enumerable to filter.
 * @param {Function} predicate - A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
 */
function WhereEnumerator(source, predicate) {
	this._enumerator = source.getEnumerator();
	this._predicate = predicate;
	this.reset();
}

/** @this WhereEnumerator 
 * Gets the current element in the collection.
 * @returns {*} The current element in the collection.
 */
WhereEnumerator.prototype.getCurrent = function() {
	return this._enumerator.getCurrent();
};

/** @this WhereEnumerator 
 * Advances the enumerator to the next element of the collection.
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
WhereEnumerator.prototype.moveNext = function() {
	var current;
	
	while(this._enumerator.moveNext()) {
		current = this._enumerator.getCurrent();
		if (this._predicate.call(current, current, ++this._index)) {
			return true;
		}
	}
	
	return false;
};

/** @this WhereEnumerator 
 * Sets the enumerator to its initial position, which is before the first element in the collection.
 */
WhereEnumerator.prototype.reset = function() {
	this._enumerator.reset();
	this._index = -1;
};