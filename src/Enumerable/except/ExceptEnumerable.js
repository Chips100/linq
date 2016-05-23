/**
 * @file Adds the except method to the Enumerable prototype.
 * @author Chips100
 */

/** @this Enumerable 
 * Produces the set difference of two sequences by using the specified comparer to compare values.
 * @param {Enumerable} second - An Enumerable whose elements that also occur in the first sequence will cause those elements to be removed from the returned sequence.
 * @param {Function|EqualityComparer} comparer - A function or an EqualityComparer to compare values for equality.
 * @returns {Enumerable} A sequence that contains the set difference of the elements of two sequences.
 */
Enumerable.prototype.except = function(second, comparer) {
	return new ExceptEnumerable(this, second, comparer);
};

/**
 * Represents an Enumerable created by an except operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} first - An Enumerable whose elements that are not also in second will be returned.
 * @param {Enumerable} second - An Enumerable whose elements that also occur in the first sequence will cause those elements to be removed from the returned sequence.
 * @param {Function|EqualityComparer} comparer - A function or an EqualityComparer to compare values for equality.
 */
function ExceptEnumerable(first, second, comparer) {
	LinqUtils.checkEnumerableArgument(first, 'first');
	LinqUtils.checkEnumerableArgument(second, 'second');
	
	this._first = first;
	this._second = second;
	this._comparer = LinqUtils.createEqualityComparer(comparer);
}

// Put the Enumerable prototype into the prototype chain.
ExceptEnumerable.prototype = Object.create(Enumerable);

/** @this ExceptEnumerable
 * Returns an Enumerator that iterates through the current collection.
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
ExceptEnumerable.prototype.getEnumerator = function() {
	return new ExceptEnumerator(this._first, this._second, this._comparer);
};