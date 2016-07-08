/**
 * @file Defines the LookupEnumerable type that is used to treat Lookups like Enumerables of Groupings.
 * @author Chips100
 */

/**
 * Represents an Enumerable created from a Lookup.
 * @class
 * @augments Enumerable
 * @param {Lookup} lookup - The Lookup with the groupings that this Enumerable should contain.
 */
function LookupEnumerable(lookup) {
	LinqAssert.requiredLookup(lookup, 'lookup');
    
    this._lookup = lookup;
}

// Put the Enumerable prototype into the prototype chain.
LookupEnumerable.prototype = Object.create(Enumerable.prototype);

/** Returns an Enumerator that iterates through the current collection.
 * @this LookupEnumerable
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
LookupEnumerable.prototype.getEnumerator = function () {
	return new LookupEnumerator(this._lookup);
};