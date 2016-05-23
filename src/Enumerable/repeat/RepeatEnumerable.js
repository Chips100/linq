/**
 * @file Adds the static repeat method to the Enumerable type.
 * @author Chips100
 */

/**
 * Generates a sequence that contains one repeated value.
 * @param {*} element - The value to be repeated.
 * @param {Number} count - The number of times to repeat the value in the generated sequence.
 * @returns {Enumerable} An Enumerable that contains a repeated value.
 */
Enumerable.repeat = function(element, count) {
	return new RepeatEnumerable(element, count);
};

/**
 * Represents an Enumerable created by a repeat operation.
 * @class
 * @augments Enumerable
 * @param {*} element - The value to be repeated.
 * @param {Number} count - The number of times to repeat the value in the generated sequence.
 */
function RepeatEnumerable(element, count) {
	LinqUtils.checkPositiveNumberArgument(count, 'count');
	
	this._element = element;
	this._count = count;
}

// Put the Enumerable prototype into the prototype chain.
RepeatEnumerable.prototype = Object.create(Enumerable.prototype);

/** @this RepeatEnumerable 
 * @override
 * Returns an Enumerator that iterates through the current collection.
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
RepeatEnumerable.prototype.getEnumerator = function() {
	return new RepeatEnumerator(this._element, this._count);
};