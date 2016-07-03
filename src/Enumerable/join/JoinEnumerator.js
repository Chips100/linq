/**
 * @file Defines the JoinEnumerator used to iterate through collections created by a join operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a join operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} outer - The first sequence to join.
 * @param {Enumerable} inner - The sequence to join to the first sequence.
 * @param {Function} outerKeySelector - A function to extract the join key from each element of the first sequence.
 * @param {Function} innerKeySelector - A function to extract the join key from each element of the second sequence.
 * @param {Function} resultSelector - A function to create a result element from two matching elements.
 * @param {Function|EqualityComparer} keyEqualityComparer - A function or an EqualityComparer to compare keys for equality.
 */
function JoinEnumerator(outer, inner, outerKeySelector, innerKeySelector, resultSelector, keyEqualityComparer) {
	this._outerEnumerator = outer.getEnumerator();
	this._innerEnumerable = inner;
	this._outerKeySelector = outerKeySelector;
	this._innerKeySelector = innerKeySelector;
	this._resultSelector = resultSelector;
	this._keyEqualityComparer = keyEqualityComparer;

	this.reset();
}

/** @this JoinEnumerator 
 * Gets the current element in the collection.
 * @returns {*} The current element in the collection.
 */
JoinEnumerator.prototype.getCurrent = function () {
	return this._resultSelector(this._currentOuter, this._currentInnerEnumerator.getCurrent());
};

/** @this JoinEnumerator 
 * Advances the enumerator to the next element of the collection.
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
JoinEnumerator.prototype.moveNext = function () {
	if (!this._hasScannedInner) {
		this._hasScannedInner = true;
		this._innerLookup = this._innerEnumerable.toLookup(this._innerKeySelector, undefined, this._keyEqualityComparer);		
	}

	if (this._currentInnerEnumerator && this._currentInnerEnumerator.moveNext()) {
		return true;
	}
	else {
		if (!this._outerEnumerator.moveNext()) {
			return false;
		}
		else {
			this._currentOuter = this._outerEnumerator.getCurrent();
			this._currentInnerEnumerator = this._innerLookup.get(this._outerKeySelector(this._currentOuter)).getEnumerator();
			return this.moveNext();
		}
	}
};

/** @this JoinEnumerator 
 * Sets the enumerator to its initial position, which is before the first element in the collection.
 */
JoinEnumerator.prototype.reset = function () {
	this._outerEnumerator.reset();
	this._hasScannedInner = false;
	this._currentInnerEnumerator = undefined;
	this._currentOuter = undefined;
};