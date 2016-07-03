/**
 * @file Adds the toArray method to the Enumerable prototype.
 * @author Chips100
 */

/** Copies the elements of this sequence to a new array.
 * @this Enumerable
 * @returns {Array} An array containing copies of the elements of this sequence.
 */
Enumerable.prototype.toArray = function () {
	var result = [],
		enumerator = this.getEnumerator();

	while (enumerator.moveNext()) {
		result.push(enumerator.getCurrent());
	}

	return result;
};