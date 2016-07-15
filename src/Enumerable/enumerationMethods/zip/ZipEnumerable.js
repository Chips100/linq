/**
 * @file Adds the zip method to the Enumerable prototype.
 * @author Chips100
 */

/** Applies a specified function to the corresponding elements of this sequence and the specified second sequence.
 * @this Enumerable
 * @param {Enumerable|Array} second - The second sequence.
 * @param {Function} resultSelector - The function to apply to the corresponding elements of the two sequences.
 * @returns {Enumerable} A sequence with elements produced by the resultSelector from corresponding elements of the two sequences.
 */
Enumerable.prototype.zip = function (inner, outerKeySelector, innerKeySelector, resultSelector, keyEqualityComparer) {
	return new ZipEnumerable(this, inner, outerKeySelector, innerKeySelector, resultSelector, keyEqualityComparer);
};

/**
 * Represents an Enumerable created by a zip operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable|Array} first - The first sequence.
 * @param {Enumerable|Array} second - The second sequence.
 * @param {Function} resultSelector - The function to apply to the corresponding elements of the two sequences.
 */
function ZipEnumerable(first, second, resultSelector) {
    LinqAssert.requiredFunction(resultSelector, 'resultSelector');
    
    this._first = LinqUtils.createEnumerable(first, 'first');
    this._second = LinqUtils.createEnumerable(second, 'second');
    this._resultSelector = resultSelector;
}

// Put the Enumerable prototype into the prototype chain.
ZipEnumerable.prototype = Object.create(Enumerable.prototype);

/** Returns an Enumerator that iterates through the current collection.
 * @this ZipEnumerable
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
ZipEnumerable.prototype.getEnumerator = function () {
	return new ZipEnumerator(this._first, this._second, this._resultSelector);
};