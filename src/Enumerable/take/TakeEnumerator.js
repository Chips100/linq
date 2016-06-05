/**
 * @file Defines the TakeEnumerator used to iterate through collections created by a take operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a concat operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} source - The sequence to return elements from.
 * @param {Number} count - The number of elements to return.
 */
function TakeEnumerator(source, number) {
	this._enumerator = source.getEnumerator();
	this._number = number;
	this.reset();
}

/** @this TakeEnumerator 
 * Gets the current element in the collection.
 * @returns {*} The current element in the collection.
 */
TakeEnumerator.prototype.getCurrent = function () {
	return this._enumerator.getCurrent();
};

/** @this TakeEnumerator 
 * Advances the enumerator to the next element of the collection.
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
TakeEnumerator.prototype.moveNext = function () {
	return this._count++ < this._number && this._enumerator.moveNext();
};

/** @this TakeEnumerator 
 * Sets the enumerator to its initial position, which is before the first element in the collection.
 */
TakeEnumerator.prototype.reset = function () {
	this._enumerator.reset();
	this._count = 0;
};