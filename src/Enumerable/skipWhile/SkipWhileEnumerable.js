/**
 * @file Adds the skipWhile method to the Enumerable prototype.
 * @author Chips100
 */

/** @this Enumerable 
 * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
 * The element's index can be  used in the logic of the predicate function.
 * @param {Function} predicate - A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
 * @returns {Enumerable} An Enumerable that contains the elements from the input sequence starting at the first element in the linear series that does not pass the test specified by predicate.
 */
Enumerable.prototype.skipWhile = function(predicate) {
	return new SkipWhileEnumerable(this, predicate);
};

/**
 * Represents an Enumerable created by a skipWhile operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} source - An Enumerable to return elements from.
 * @param {Function} predicate - A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
 */
function SkipWhileEnumerable(source, predicate) {
	LinqUtils.checkEnumerableArgument(source, 'source');
	LinqUtils.checkFunctionArgument(predicate, 'predicate');
	
	this._source = source;
	this._predicate = predicate;
}

// Put the Enumerable prototype into the prototype chain.
SkipWhileEnumerable.prototype = Object.create(Enumerable.prototype);

/** @this SkipWhileEnumerable
 * Returns an Enumerator that iterates through the current collection.
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
SkipWhileEnumerable.prototype.getEnumerator = function() {
	return new SkipWhileEnumerator(this._source, this._predicate);
};