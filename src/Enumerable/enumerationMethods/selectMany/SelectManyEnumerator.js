/**
 * @file Defines the SelectManyEnumerator used to iterate through collections created by a selectMany operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a selectMany operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} source - A sequence of values to project.
 * @param {Function} collectionSelector - A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
 * @param {Function} [resultSelector] - An optional transform function to apply to each element of the intermediate sequence.
 */
function SelectManyEnumerator(source, collectionSelector, resultSelector) {
	this._enumerator = source.getEnumerator();
	this._collectionSelector = collectionSelector;
	this._resultSelector = resultSelector;
	
	this.reset();
}

/** Gets the current element in the collection.
 * @this SelectManyEnumerator
 * @returns {*} The current element in the collection.
 */
SelectManyEnumerator.prototype.getCurrent = function() {
	var current = this._currentEnumerator.getCurrent();
	
	if (LinqUtils.isFunction(this._resultSelector)) {
		return this._resultSelector.call(this._currentElement, this._currentElement, current);
	}
	else {
		return current;
	}
};

/** Advances the enumerator to the next element of the collection.
 * @this SelectManyEnumerator
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
SelectManyEnumerator.prototype.moveNext = function() {
	var currentCollection;
	
	if (this._currentEnumerator && this._currentEnumerator.moveNext()) {
		return true;
	}
	else {
		this._index++;
		
		if (!this._enumerator.moveNext()) {
			// No more elements in original enumeration left.
			return false;
		}
		else {
			this._currentElement = this._enumerator.getCurrent();
			currentCollection = this._collectionSelector.call(this._currentElement, this._currentElement, this._index);
			
			if (!(currentCollection instanceof Enumerable)) {
				currentCollection = new List(currentCollection);
			}
			
			this._currentEnumerator = currentCollection.getEnumerator();
			
			if (this._currentEnumerator.moveNext()) {
				return true;
			}
			else {
				// This collection of original enumeration element contains no elements.
				// So we try to move to the next original enumeration element by calling this.moveNext.
				return this.moveNext();
			}
		}
	}
};

/** Sets the enumerator to its initial position, which is before the first element in the collection.
 * @this SelectManyEnumerator
 */
SelectManyEnumerator.prototype.reset = function() {
	this._enumerator.reset();
	this._index = -1;
	this._currentElement = undefined;
	this._currentEnumerator = undefined;
};