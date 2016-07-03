/**
 * @file Adds the any method to the Enumerable prototype.
 * @author Chips100
 */

/** Determines whether any element of a sequence satisfies a condition.
 * @this Enumerable
 * @param {Function} [predicate] - A function to test each element for a condition. If omitted, this method determines if the sequence contains any elements.
 * @returns {Boolean} true if any elements in the source sequence pass the test in the specified predicate; otherwise, false.
 */
Enumerable.prototype.any = function (predicate) {
	var enumerator = this.getEnumerator(),
		current;

	if (!LinqUtils.isFunction(predicate)) {
		// If no predicate was provided, just check if there is at least one item.
		return enumerator.moveNext();
	}
	else {
		while (enumerator.moveNext()) {
			current = enumerator.getCurrent();

			if (predicate.call(current, current)) {
				return true;
			}
		}

		return false;
	}
};