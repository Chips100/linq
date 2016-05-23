/**
 * @file Defines the Enumerable type.
 * @author Chips100
 */

/**
 * Base type for Enumerables.
 * @class
 */
function Enumerable() {}

/** @this Enumerable
 * Returns an Enumerator that iterates through a collection.
 * @abstract
 * @returns {Enumerator} An Enumerator that can be used to iterate through the collection.
 */
Enumerable.prototype.getEnumerator = function() {
	throw new Error('Not implemented: Enumerable does not support getEnumerator.');
};