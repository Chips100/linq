/**
 * @file Adds the selectMany method to the Enumerable prototype.
 * @author Chips100
 */

/** @this Enumerable 
 * Projects each element of a sequence to an Enumerable, flattens the resulting sequences into one sequence, 
 * and invokes a result selector function on each element therein. 
 * The index of each source element can be used in the intermediate projected form of that element.
 * @param {Function} collectionSelector - A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
 * @param {Function} [resultSelector] - An optional transform function to apply to each element of the intermediate sequence.
 * @returns {Enumerable} An Enumerable whose elements are the result of invoking the one-to-many transform function collectionSelector 
 * on each element of source and then mapping each of those sequence elements and their corresponding source element to a result element.
 */
Enumerable.prototype.selectMany = function(collectionSelector, resultSelector) {
	return new SelectManyEnumerable(this, collectionSelector, resultSelector);
};

/**
 * Represents an Enumerable created by a selectMany operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} source - A sequence of values to project.
 * @param {Function} collectionSelector - A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
 * @param {Function} [resultSelector] - An optional transform function to apply to each element of the intermediate sequence.
 */
function SelectManyEnumerable(source, collectionSelector, resultSelector) {
	LinqUtils.checkEnumerableArgument(source, 'source');
	LinqUtils.checkFunctionArgument(collectionSelector, 'collectionSelector');
	
	this._source = source;
	this._collectionSelector = collectionSelector;
	this._resultSelector = resultSelector;
}

// Put the Enumerable prototype into the prototype chain.
SelectManyEnumerable.prototype = Object.create(Enumerable.prototype);

/** @this SelectManyEnumerable 
 * @override
 * Returns an Enumerator that iterates through the current collection.
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
SelectManyEnumerable.prototype.getEnumerator = function() {
	return new SelectManyEnumerator(this._source, this._collectionSelector, this._resultSelector);
};

