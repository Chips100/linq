/**
 * @file Defines the LookupEnumerator type that is used to iterate over groupings from a Lookup.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate over groupings from a Lookup.
 * @class
 * @augments Enumerator
 * @param {Lookup} lookup - The Lookup with the groupings to iterate over.
 */
function LookupEnumerator(lookup) {
    this._lookup = lookup;
    this._keyEnumerator = lookup.getKeys().getEnumerator();
}

/** Gets the current element in the collection.
 * @this LookupEnumerator
 * @returns {*} The current element in the collection.
 */
LookupEnumerator.prototype.getCurrent = function () {
	return this._lookup.get(this._keyEnumerator.getCurrent());
};

/** Advances the enumerator to the next element of the collection.
 * @this LookupEnumerator
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
LookupEnumerator.prototype.moveNext = function () {
    return this._keyEnumerator.moveNext();
};

/** Sets the enumerator to its initial position, which is before the first element in the collection.
 * @this LookupEnumerator
 */
LookupEnumerator.prototype.reset = function () {
    this._keyEnumerator.reset();
};