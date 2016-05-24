/**
 * @file Adds the select method to the Enumerable prototype.
 * @author Chips100
 */

/** @this Enumerable 
 * Projects each element of a sequence into a new form.
 * @param {Function} selector - A transform function to apply to each element.
 * @returns {Enumerable} An Enumerable whose elements are the result of invoking the transform function on each element of the current sequence.
 */
Enumerable.prototype.select = function(selector) {
	return new SelectEnumerable(this, selector);
};

/**
 * Represents an Enumerable created by a select operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} source - A sequence of values to invoke a transform function on.
 * @param {Function} selector - A transform function to apply to each element.
 */
function SelectEnumerable(source, selector) {
	LinqAssert.requiredEnumerable(source, 'source');
	LinqAssert.requiredFunction(selector, 'selector');
	
	this._source = source;
	this._selector = selector;
}

// Put the Enumerable prototype into the prototype chain.
SelectEnumerable.prototype = Object.create(Enumerable.prototype);

/** @this SelectEnumerable
 * Returns an Enumerator that iterates through the current collection.
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
SelectEnumerable.prototype.getEnumerator = function() {
	return new SelectEnumerator(this._source, this._selector);
};