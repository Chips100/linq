/**
 * @file Adds the takeWhile method to the Enumerable prototype.
 * @author Chips100
 */

/** Returns elements from a sequence as long as a specified condition is true. 
 * @this Enumerable
 * The element's index can be used in the logic of the predicate function.
 * @param {Function} predicate - A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
 * @returns {Enumerable} An Enumerable that contains elements from the input sequence that occur before the element at which the test no longer passes.
 */
Enumerable.prototype.takeWhile = function(predicate) {
	return new TakeWhileEnumerable(this, predicate);
};

/**
 * Represents an Enumerable created by a takeWhile operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} source - The sequence to return elements from.
 * @param {Function} predicate - A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
 */
function TakeWhileEnumerable(source, predicate) {
	LinqAssert.requiredEnumerable(source, 'source');
	LinqAssert.requiredFunction(predicate, 'predicate');
	
	this._source = source;
	this._predicate = predicate;
}

// Put the Enumerable prototype into the prototype chain.
TakeWhileEnumerable.prototype = Object.create(Enumerable.prototype);

/** Returns an Enumerator that iterates through the current collection.
 * @this TakeWhileEnumerable
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
TakeWhileEnumerable.prototype.getEnumerator = function() {
	return new TakeWhileEnumerator(this._source, this._predicate);
};