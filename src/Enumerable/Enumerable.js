/**
 * @file Defines the Enumerable type.
 * @author Chips100
 */

/**
 * Base type for Enumerables.
 * @class
 */
function Enumerable() {}

/** Returns an Enumerator that iterates through a collection.
 * @this Enumerable
 * @abstract
 * @returns {Enumerator} An Enumerator that can be used to iterate through the collection.
 */
Enumerable.prototype.getEnumerator = function() {
	throw new Error('Not implemented: Enumerable does not support getEnumerator.');
};

/** Creates a new List with the items from this sequence.
 * @this Enumerable
 * @returns {List} A List with the items from this sequence.
 */
Enumerable.prototype.toList = function() {
	return new List(this);	
};