/**
 * @file Defines the ZipEnumerator used to iterate through collections created by a zip operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a zip operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable|Array} first - The first sequence.
 * @param {Enumerable|Array} second - The second sequence.
 * @param {Function} resultSelector - The function to apply to the corresponding elements of the two sequences.
 */
function ZipEnumerator(first, second, resultSelector) {
    this._firstEnumerator = first.getEnumerator();
    this._secondEnumerator = second.getEnumerator();
    this._resultSelector = resultSelector;

	this.reset();
}

/** Gets the current element in the collection.
 * @this ZipEnumerator
 * @returns {*} The current element in the collection.
 */
ZipEnumerator.prototype.getCurrent = function () {
    return this._resultSelector(this._firstEnumerator.getCurrent(), this._secondEnumerator.getCurrent());
};

/** Advances the enumerator to the next element of the collection.
 * @this ZipEnumerator
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
ZipEnumerator.prototype.moveNext = function () {
    return this._firstEnumerator.moveNext() && this._secondEnumerator.moveNext();
};

/** Sets the enumerator to its initial position, which is before the first element in the collection.
 * @this ZipEnumerator
 */
ZipEnumerator.prototype.reset = function () {
    this._firstEnumerator.reset();
    this._secondEnumerator.reset();
};