/**
 * @file Defines the ListEnumerator type used to iterate over instances of List.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through an instance of List.
 * @class
 * @augments Enumerator
 * @param {Array} [array] - An array that served as the storage for the List that should be iterated.
 */
function ListEnumerator(arr) {
	this._array = arr || [];
	this.reset();
}

/** @this ListEnumerator 
 * Gets the current element in the collection.
 * @returns {*} The current element in the collection.
 */
ListEnumerator.prototype.getCurrent = function() {
	return this._array[this._index];
};

/** @this ListEnumerator 
 * Advances the enumerator to the next element of the collection.
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
ListEnumerator.prototype.moveNext = function() {
	return ++this._index < this._count;
};

/** @this ListEnumerator 
 * Sets the enumerator to its initial position, which is before the first element in the collection.
 */
ListEnumerator.prototype.reset = function() {
	this._index = -1;
	this._count = this._array.length;
};