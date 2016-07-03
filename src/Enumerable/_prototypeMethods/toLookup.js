/**
 * @file Adds the toLookup method to the Enumerable prototype.
 * @author Chips100
 */

/** @this Enumerable 
 * Creates a lookup object from a sequence according to a specified key selector function and an element selector function.
 * @param {Function} keySelector - A function used to extract a key from each element.
 * @param {Function} [elementSelector] - A transform function to produce a result element value from each element.
 * @param {Function|EqualityComparer} [keyEqualityComparer] - Comparer used for comparing keys extracted from elements.
 * @returns {Lookup} A lookup object with the grouped elements.
 */
Enumerable.prototype.toLookup = function (keySelector, elementSelector, keyEqualityComparer) {
    return new Lookup(this, keySelector, elementSelector, keyEqualityComparer);
};