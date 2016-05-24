/**
 * @file Adds the distinct method to the Enumerable prototype.
 * @author Chips100
 */

/** @this Enumerable 
 * Returns distinct elements from a sequence by using a specified comparer to compare values.
 * @param {Function|EqualityComparer} comparer - A function or an EqualityComparer to compare values for equality.
 * @returns {Enumerable} An Enumerable that contains distinct elements from the source sequence.
 */
Enumerable.prototype.distinct = function(comparer) {
	return new DistinctEnumerable(this, comparer);
};

/**
 * Represents an Enumerable created by a distinct operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} source - The sequence to remove duplicate elements from.
 * @param {Function|EqualityComparer} comparer - A function or an EqualityComparer to compare values for equality.
 */
function DistinctEnumerable(source, comparer) {
	LinqAssert.requiredEnumerable(source, 'source');
	
	this._source = source;
	this._comparer = LinqUtils.createEqualityComparer(comparer);
}

// Put the Enumerable prototype into the prototype chain.
DistinctEnumerable.prototype = Object.create(Enumerable.prototype);

/** @this DistinctEnumerable
 * Returns an Enumerator that iterates through the current collection.
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
DistinctEnumerable.prototype.getEnumerator = function() {
	return new DistinctEnumerator(this._source, this._comparer);
};