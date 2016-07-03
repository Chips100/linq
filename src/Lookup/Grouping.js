/**
 * @file Defines the Grouping type that is used to hold multiple elements associated with a key.
 * @author Chips100
 */

/**
 * Creates a Grouping with the specified key.
 * @class
 * @param {*} key - The key that the elements in this grouping are associated with.
 */
function Grouping(key) {
    this._elements = new List();
    this._elements.key = key;
}

/** Adds the specified element to this Grouping.
 * @this Grouping
 * @param {*} element - The element to add to this grouping.
 */
Grouping.prototype.addElement = function(element) {
    this._elements.add(element);
};

/** Gets the elements of this Grouping.
 * @this Grouping
 * @returns {Enumerable} A sequence with the elements of this Grouping.
 */
Grouping.prototype.getElements = function() {
    return this._elements;
};

/** Gets the key that the elements in this grouping are associated with.
 * @this Grouping
 * @returns {*} The key that the elements in this grouping are associated with.
 */
Grouping.prototype.getKey = function() {
    return this._elements.key;
};