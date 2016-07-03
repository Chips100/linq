/**
 * @file Documents the structure of the EqualityComparer type.
 */

/** Supports comparing values for equality and generating hash codes for values.
 * @typedef EqualityComparer
 * @type Object
 * @property {EqualsFunction} equals Determines whether two values are equal.
 * @property {GetHashCodeFunction} getHashCode Calculates a hash code for the specified value to use for data structures and algorithms.
 */

/** Determines whether two values are equal.
 * @function EqualsFunction
 * @param {*} a - The first value to compare.
 * @param {*} b - The second value to compare.
 * @returns {Boolean} true if the specified values are equal; otherwise, false.
 */
		
/** Calculates a hash code for the specified value to use for data structures and algorithms.
 * @function GetHashCodeFunction
 * @param {*} value - The value for which to get a hash code.
 * @returns {Number} A hash code for the specified value.
 */