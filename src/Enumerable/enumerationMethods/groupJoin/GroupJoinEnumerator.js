/**
 * @file Defines the GroupJoinEnumerator used to iterate through collections created by a groupJoin operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a groupJoin operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} outer - The first sequence to join.
 * @param {Enumerable} inner - The sequence to join to the first sequence.
 * @param {Function} outerKeySelector - A function to extract the join key from each element of the first sequence.
 * @param {Function} innerKeySelector - A function to extract the join key from each element of the second sequence.
 * @param {Function} resultSelector - A function to create a result element from the outer element and its matching inner elements.
 * @param {Function|EqualityComparer} keyEqualityComparer - A function or an EqualityComparer to compare keys for equality.
 */
function GroupJoinEnumerator(outer, inner, outerKeySelector, innerKeySelector, resultSelector, keyEqualityComparer) {
	this._outerEnumerator = outer.getEnumerator();
	this._innerEnumerable = inner;
	this._outerKeySelector = outerKeySelector;
	this._innerKeySelector = innerKeySelector;
	this._resultSelector = resultSelector;
	this._keyEqualityComparer = keyEqualityComparer;

	this.reset();
}

/** Gets the current element in the collection.
 * @this GroupJoinEnumerator
 * @returns {*} The current element in the collection.
 */
GroupJoinEnumerator.prototype.getCurrent = function () {
	return this._resultSelector(this._currentOuter, this._currentInnerEnumerable);
};

/** Advances the enumerator to the next element of the collection.
 * @this GroupJoinEnumerator
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
GroupJoinEnumerator.prototype.moveNext = function () {
	if (!this._hasScannedInner) {
		this._hasScannedInner = true;
		this._innerLookup = this._innerEnumerable.toLookup(this._innerKeySelector, undefined, this._keyEqualityComparer);		
	}

    if (!this._outerEnumerator.moveNext()) {
        return false;
    }
    else {
        this._currentOuter = this._outerEnumerator.getCurrent();
        this._currentInnerEnumerable = this._innerLookup.get(this._outerKeySelector(this._currentOuter));

        if (this._currentInnerEnumerable.any()) {
            return true;
        }
        else {
            return this.moveNext();
        }
    }
};

/** Sets the enumerator to its initial position, which is before the first element in the collection.
 * @this GroupJoinEnumerator
 */
GroupJoinEnumerator.prototype.reset = function () {
	this._outerEnumerator.reset();
	this._hasScannedInner = false;
	this._currentInnerEnumerable = undefined;
	this._currentOuter = undefined;
};