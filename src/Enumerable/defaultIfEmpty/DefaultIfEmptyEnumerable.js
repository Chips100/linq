/**
 * @file Adds the defaultIfEmpty method to the Enumerable prototype.
 * @author Chips100
 */

/** @this Enumerable 
 * Returns the elements of the specified sequence or the specified value in a singleton collection if the sequence is empty.
 * @param {*} defaultValue - The value to return if the sequence is empty.
 * @returns {Enumerable} An Enumerable that contains defaultValue if the current sequence is empty; otherwise, the current sequence.
 */
Enumerable.prototype.defaultIfEmpty = function(defaultValue) {
	return new DefaultIfEmptyEnumerable(this, defaultValue);
};

/**
 * Represents an Enumerable created by a defaultIfEmpty operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} source - The sequence to return the specified value for if it is empty.
 * @param {*} defaultValue - The value to return if the sequence is empty.
 */
function DefaultIfEmptyEnumerable(source, defaultValue) {
	LinqUtils.checkEnumerableArgument(source, 'source');
	
	this._source = source;
	this._defaultValue = defaultValue;
}

// Put the Enumerable prototype into the prototype chain.
DefaultIfEmptyEnumerable.prototype = Object.create(Enumerable.prototype);

/** @this DefaultIfEmptyEnumerable
 * Returns an Enumerator that iterates through the current collection.
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
DefaultIfEmptyEnumerable.prototype.getEnumerator = function() {
	return new DefaultIfEmptyEnumerator(this._source, this._defaultValue);
};