/**
 * @file Defines the DefaultIfEmptyEnumerator used to iterate through collections created by a defaultIfEmpty operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a defaultIfEmpty operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} source - The sequence to return the specified value for if it is empty.
 * @param {*} defaultValue - The value to return if the sequence is empty.
 */
function DefaultIfEmptyEnumerator(source, defaultValue) {
	this._enumerator = source.getEnumerator();
	this._defaultValue = defaultValue;
}

/** @this DefaultIfEmptyEnumerator 
 * Gets the current element in the collection.
 * @returns {*} The current element in the collection.
 */
DefaultIfEmptyEnumerator.prototype.getCurrent = function () {
	if (this._useSource) {
		return this._enumerator.getCurrent();
	}
	else {
		return this._defaultValue;
	}
};

/** @this DefaultIfEmptyEnumerator 
 * Advances the enumerator to the next element of the collection.
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
DefaultIfEmptyEnumerator.prototype.moveNext = function () {
	if (!this._useSource && !this._useDefault) {
		this._useSource = this._enumerator.moveNext();
		this._useDefault = !this._useSource;
		return true;
	}
	else if (this._useSource) {
		return this._enumerator.moveNext();
	}
	else if (this._useDefault) {
		return false;
	}
};

/** @this DefaultIfEmptyEnumerator 
 * Sets the enumerator to its initial position, which is before the first element in the collection.
 */
DefaultIfEmptyEnumerator.prototype.reset = function () {
	this._useSource = false;
	this._useDefault = false;
	this._enumerator.reset();
};