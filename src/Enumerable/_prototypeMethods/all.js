/**
 * @file Adds the all method to the Enumerable prototype.
 * @author Chips100
 */

/** @this Enumerable 
 * Determines whether all elements of a sequence satisfy a condition.
 * @param {Function} predicate - A function to test each element for a condition.
 * @returns {Boolean} true if every element of the source sequence passes the test in the specified predicate, or if the sequence is empty; otherwise, false.
 */
Enumerable.prototype.all = function (predicate) {
	LinqAssert.requiredFunction(predicate, 'predicate');

	var enumerator = this.getEnumerator(),
		current;

	while (enumerator.moveNext()) {
		current = enumerator.getCurrent();

		if (!predicate.call(current, current)) {
			return false;
		}
	}

	return true;
};