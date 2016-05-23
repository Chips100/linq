/**
 * @file Adds the static range method to the Enumerable type.
 * @author Chips100
 */

/** 
 * Generates a sequence of integral numbers within a specified range.
 * @param {Number} start - The value of the first integer in the sequence.
 * @param {Number} count - The number of sequential integers to generate.
 * @returns {Enumerable} An Enumerable that contains a range of sequential integral numbers.
 */
Enumerable.range = function(start, count) {
	return new RangeEnumerable(start, count);
};

/**
 * Represents an Enumerable created by a range operation.
 * @class
 * @augments Enumerable
 * @param {Number} start - The value of the first integer in the sequence.
 * @param {Number} count - The number of sequential integers to generate.
 */
function RangeEnumerable(start, count) {
	LinqUtils.checkNumberArgument(start, 'start');
	LinqUtils.checkPositiveNumberArgument(count, 'count');
	
	this._start = +start;
	this._count = +count;
}

// Put the Enumerable prototype into the prototype chain.
RangeEnumerable.prototype = Object.create(Enumerable.prototype);

/** @this RangeEnumerable 
 * @override
 * Returns an Enumerator that iterates through the current collection.
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
RangeEnumerable.prototype.getEnumerator = function() {
	return new RangeEnumerator(this._start, this._count);
};