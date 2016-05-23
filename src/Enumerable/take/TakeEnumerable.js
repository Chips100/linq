/**
 * @file Adds the take method to the Enumerable prototype.
 * @author Chips100
 */

/** @this Enumerable 
 * Returns a specified number of contiguous elements from the start of a sequence.
 * @param {Number} count - The number of elements to return.
 * @returns {Enumerable} An Enumerable that contains the specified number of elements from the start of the input sequence.
 */
Enumerable.prototype.take = function(count) {
	return new TakeEnumerable(this, count);
};

/**
 * Represents an Enumerable created by a take operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} source - The sequence to return elements from.
 * @param {Number} count - The number of elements to return.
 */
function TakeEnumerable(source, count) {
	LinqUtils.checkEnumerableArgument(source, 'source');
	LinqUtils.checkNumberArgument(count, 'count');
	
	this._source = source;
	this._count = count;
}

// Put the Enumerable prototype into the prototype chain.
TakeEnumerable.prototype = Object.create(Enumerable.prototype);

/** @this TakeEnumerable 
 * @override
 * Returns an Enumerator that iterates through the current collection.
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
TakeEnumerable.prototype.getEnumerator = function() {
	return new TakeEnumerator(this._source, this._count);
};