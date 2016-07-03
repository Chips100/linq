/**
 * @file Adds the intersect method to the Enumerable prototype.
 * @author Chips100
 */

/** Produces the set intersection of two sequences by using the specified comparer to compare values.
 * @this Enumerable
 * @param {Enumerable} second - An Enumerable whose distinct elements that also appear in the first sequence will be returned.
 * @param {Function|EqualityComparer} comparer - A function or an EqualityComparer to compare values for equality.
 * @returns {Enumerable} A sequence that contains the elements that form the set intersection of two sequences.
 */
Enumerable.prototype.intersect = function (second, comparer) {
	return new IntersectEnumerable(this, second, comparer);
};

/**
 * Represents an Enumerable created by an intersect operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} first - An Enumerable whose distinct elements that also appear in second will be returned.
 * @param {Enumerable} second - An Enumerable whose distinct elements that also appear in the first sequence will be returned.
 * @param {Function|EqualityComparer} comparer - A function or an EqualityComparer to compare values for equality.
 */
function IntersectEnumerable(first, second, comparer) {
	LinqAssert.requiredEnumerable(first, 'first');
	LinqAssert.requiredEnumerable(second, 'second');

	this._first = first;
	this._second = second;
	this._comparer = LinqUtils.createEqualityComparer(comparer);
}

// Put the Enumerable prototype into the prototype chain.
IntersectEnumerable.prototype = Object.create(Enumerable.prototype);

/** Returns an Enumerator that iterates through the current collection.
 * @this IntersectEnumerable
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
IntersectEnumerable.prototype.getEnumerator = function () {
	return new IntersectEnumerator(this._first, this._second, this._comparer);
};