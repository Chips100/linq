/**
 * @file Defines the DistinctEnumerator used to iterate through collections created by a distinct operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a distinct operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} source - The sequence to remove duplicate elements from.
 * @param {Function|EqualityComparer} comparer - A function or an EqualityComparer to compare values for equality.
 */
function DistinctEnumerator(source, comparer) {
	this._enumerator = source.getEnumerator();
	this._comparer = comparer;
	
	this.reset();
}

/** @this DistinctEnumerator 
 * Gets the current element in the collection.
 * @returns {*} The current element in the collection.
 */
DistinctEnumerator.prototype.getCurrent = function() {
	return this._enumerator.getCurrent();
};

/** @this DistinctEnumerator 
 * Advances the enumerator to the next element of the collection.
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
DistinctEnumerator.prototype.moveNext = function() {
	var current,
		currentHash,
		possibleDuplicate;
	
	if (this._enumerator.moveNext()) {
		current = this._enumerator.getCurrent();
		currentHash = this._comparer.getHashCode(current);
		
		if (!this._seenElements[currentHash]) {
			this._seenElements[currentHash] = [current];
			return true;
		}
		else {
			for (var i = this._seenElements[currentHash].length - 1; i >= 0; i--) {
				if (this._comparer.equals(current, this._seenElements[currentHash][i])) {
					return this.moveNext();
				}
			}
			
			this._seenElements[currentHash].push(current);
			return true;
		}
	}
	else {
		return false;
	}
};

/** @this DistinctEnumerator 
 * Sets the enumerator to its initial position, which is before the first element in the collection.
 */
DistinctEnumerator.prototype.reset = function() {
	this._seenElements = {};
	this._enumerator.reset();
};