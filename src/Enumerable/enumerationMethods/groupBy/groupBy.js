/**
 * @file Adds the groupBy method to the Enumerable prototype.
 * @author Chips100
 */

/** Groups the elements of this sequence by keys extracted from them.
 * @this Enumerable
 * @param {Function} keySelector - A function used to extract a key from each element.
 * @param {Function} [elementSelector] - A transform function to produce a result element value from each element.
 * @param {Function} [resultSelector] - A transform function to produce a result element value from each sequence of grouped elements.
 * @param {Function|EqualityComparer} [keyEqualityComparer] - Comparer used for comparing keys extracted from elements.
 * @returns {Enumerable} A sequence of the grouped elements, transformed using the resultSelector, if specified.
 */
Enumerable.prototype.groupBy = function(keySelector, elementSelector, resultSelector, keyEqualityComparer) {
    resultSelector = LinqUtils.createSelectorFunction(resultSelector);

    // groupBy is used for grouping elements by keys, just like in toLookup, but returns a sequence of groupings.
    // We make use of the toLookup function, transform it into a sequence of groupings and apply the optional resultSelector.
    return this.toLookup(keySelector, elementSelector, keyEqualityComparer).asEnumerable().select(function(g) { return resultSelector(g); });
};