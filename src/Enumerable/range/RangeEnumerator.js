/**
 * @file Defines the RangeEnumerator used to iterate through collections created by a range operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a range operation.
 * @class
 * @augments Enumerator
 * @param {Number} start - The value of the first integer in the sequence.
 * @param {Number} count - The number of sequential integers to generate.
 */
function RangeEnumerator(start, count) {
	this._start = start;
	this._end = start + count;
	
	this.reset();
}

/** @this RangeEnumerator 
 * Gets the current element in the collection.
 * @returns {*} The current element in the collection.
 */
RangeEnumerator.prototype.getCurrent = function() {
	if (this._index <= this._start || this._index > this._end ) {
		throw new Error('invalid cursor position');
	}
	
	return this._index - 1;
};

/** @this RangeEnumerator 
 * Advances the enumerator to the next element of the collection.
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
RangeEnumerator.prototype.moveNext = function() {
	return this._index++ < this._end;
};

/** @this RangeEnumerator 
 * Sets the enumerator to its initial position, which is before the first element in the collection.
 */
RangeEnumerator.prototype.reset = function() {
	this._index = this._start;
};
