/**
 * @file Adds the where method to the Enumerable prototype.
 * @author Chips100
 */

/** Filters a sequence of values based on a predicate. 
 * Each element's index can be used in the logic of the predicate function.
 * @this Enumerable
 * @param {Function} predicate - A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
 * @returns {Enumerable} An Enumerable that contains elements from the input sequence that satisfy the condition.
 */
Enumerable.prototype.where = function(predicate) {
	return new WhereEnumerable(this, predicate);
};

/**
 * Represents an Enumerable created by a where operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} source - An Enumerable to filter.
 * @param {Function} predicate - A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
 */
function WhereEnumerable(source, predicate) {
	LinqAssert.requiredEnumerable(source, 'source');
	LinqAssert.requiredFunction(predicate, 'predicate');
	
	this._source = source;
	this._predicate = predicate;
}

// Put the Enumerable prototype into the prototype chain.
WhereEnumerable.prototype = Object.create(Enumerable.prototype);

/** Returns an Enumerator that iterates through the current collection.
 * @this WhereEnumerable
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
WhereEnumerable.prototype.getEnumerator = function() {
	return new WhereEnumerator(this._source, this._predicate);
};