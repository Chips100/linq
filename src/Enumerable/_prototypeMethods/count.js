/**
 * @file Adds the count method to the Enumerable prototype.
 * @author Chips100
 */

/** @this Enumerable 
 * Returns a number that represents how many elements in the specified sequence satisfy a condition.
 * @param {Function} [predicate] - A function to test each element for a condition. If omitted, all items are counted.
 * @returns {Number} A number that represents how many elements in the sequence satisfy the condition in the predicate function.
 */
Enumerable.prototype.count = function (predicate) {
	var counter = 0,
		current,
		enumerator = this.getEnumerator();

	while (enumerator.moveNext()) {
		current = enumerator.getCurrent();

		if (!LinqUtils.isFunction(predicate) || predicate.call(current, current)) {
			counter++;
		}
	}

	return counter;
};