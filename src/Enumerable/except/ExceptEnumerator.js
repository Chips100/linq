/**
 * @file Defines the ExceptEnumerator used to iterate through collections created by an except operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by an except operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} first - An Enumerable whose elements that are not also in second will be returned.
 * @param {Enumerable} second - An Enumerable whose elements that also occur in the first sequence will cause those elements to be removed from the returned sequence.
 * @param {Function|EqualityComparer} comparer - A function or an EqualityComparer to compare values for equality.
 */
function ExceptEnumerator(first, second, comparer) {
	this._firstEnumerator = first.getEnumerator();
	this._secondEnumerator = second.getEnumerator();
	this._comparer = comparer;
	
	this.reset();
}

/** @this ExceptEnumerator 
 * Gets the current element in the collection.
 * @returns {*} The current element in the collection.
 */
ExceptEnumerator.prototype.getCurrent = function() {
	return this._firstEnumerator.getCurrent();
};

/** @this ExceptEnumerator 
 * Advances the enumerator to the next element of the collection.
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
ExceptEnumerator.prototype.moveNext = function() {
	var current,
		currentHash;
	
	if (!this._hasScannedSecond) {
		while(this._secondEnumerator.moveNext()) {
			current = this._secondEnumerator.getCurrent();
			currentHash = this._comparer.getHashCode(current);
		
			if (!this._bannedElements[currentHash]) {
				this._bannedElements[currentHash] = [current];	
			}
			else {
				this._bannedElements[currentHash].push(current);
			}
		}		
		
		this._hasScannedSecond = true;
	}
	
	if (this._firstEnumerator.moveNext()) {
		current = this._firstEnumerator.getCurrent();
		currentHash = this._comparer.getHashCode(current);
		
		if (!this._bannedElements[currentHash]) {
			this._bannedElements[currentHash] = [current];
			return true;
		}
		else {
			for (var i = this._bannedElements[currentHash].length - 1; i >= 0; i--) {
				if (this._comparer.equals(current, this._bannedElements[currentHash][i])) {
					return this.moveNext();
				}
			}
			
			this._bannedElements[currentHash].push(current);
			return true;
		}
	}
	else {
		return false;
	}
};

/** @this ExceptEnumerator 
 * Sets the enumerator to its initial position, which is before the first element in the collection.
 */
ExceptEnumerator.prototype.reset = function() {
	this._firstEnumerator.reset();
	this._secondEnumerator.reset();
	this._hasScannedSecond = false;
	this._bannedElements = {};
};