/**
 * @file Defines the ConcatEnumerator used to iterate through collections created by a concat operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a concat operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} first - The first sequence to concatenate.
 * @param {Enumerable} second - The sequence to concatenate to the first sequence.
 */
function ConcatEnumerator(first, second) {
	this._firstEnumerator = first.getEnumerator();
	this._secondEnumerator = second.getEnumerator();

	this.reset();
}

/** Gets the current element in the collection.
 * @this ConcatEnumerator
 * @returns {*} The current element in the collection.
 */
ConcatEnumerator.prototype.getCurrent = function () {
	if (this._isFirstActive) {
		return this._firstEnumerator.getCurrent();
	}
	else {
		return this._secondEnumerator.getCurrent();
	}
};

/** Advances the enumerator to the next element of the collection.
 * @this ConcatEnumerator
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
ConcatEnumerator.prototype.moveNext = function () {
	if (this._isFirstActive) {
		if (this._firstEnumerator.moveNext()) {
			return true;
		}
		else {
			this._isFirstActive = false;
			return this.moveNext();
		}
	}
	else {
		return this._secondEnumerator.moveNext();
	}
};

/** Sets the enumerator to its initial position, which is before the first element in the collection. 
 * @this ConcatEnumerator
 */
ConcatEnumerator.prototype.reset = function () {
	this._secondEnumerator.reset();
	this._firstEnumerator.reset();
	this._isFirstActive = true;
};