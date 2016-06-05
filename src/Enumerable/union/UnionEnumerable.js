/**
 * @file Adds the union method to the Enumerable prototype.
 * @author Chips100
 */

/** @this Enumerable 
 * Produces the set union of two sequences by using a specified comparer.
 * @param {Enumerable} second - An Enumerable whose distinct elements form the second set for the union.
 * @param {Function|EqualityComparer} comparer - A function or an EqualityComparer to compare values for equality.
 * @returns {Enumerable} An Enumerable that contains the elements from both input sequences, excluding duplicates.
 */
Enumerable.prototype.union = function (second, comparer) {
	return new UnionEnumerable(this, second, comparer);
};

/**
 * Represents an Enumerable created by a union operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} first - An Enumerable whose distinct elements form the first set for the union.
 * @param {Enumerable} second - An Enumerable whose distinct elements form the second set for the union.
 * @param {Function|EqualityComparer} comparer - A function or an EqualityComparer to compare values for equality.
 */
function UnionEnumerable(first, second, comparer) {
	LinqAssert.requiredEnumerable(first, 'first');
	LinqAssert.requiredEnumerable(second, 'second');

	this._first = first;
	this._second = second;
	this._comparer = comparer;
}

// Put the Enumerable prototype into the prototype chain.
UnionEnumerable.prototype = Object.create(Enumerable.prototype);

/** @this UnionEnumerable
 * Returns an Enumerator that iterates through the current collection.
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
UnionEnumerable.prototype.getEnumerator = function () {
	return new UnionEnumerator(this._first, this._second, this._comparer);
};