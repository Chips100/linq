/**
 * @file Adds the firstOrDefault method to the Enumerable prototype.
 * @author Chips100
 */

/** Returns the first element of the sequence that satisfies a condition or a default value if no such element is found.
 * @this Enumerable
 * @param {Function} [predicate] - A function to test each element for a condition. If omitted, the first item from the sequence is used.
 * @returns {*} null if source is empty or if no element passes the test specified by predicate; otherwise, the first element in source that passes the test specified by predicate.
 */
Enumerable.prototype.firstOrDefault = function (predicate) {
	var enumerator = this.getEnumerator(),
		current;

	while (enumerator.moveNext()) {
		current = enumerator.getCurrent();

		if (!LinqUtils.isFunction(predicate) || predicate.call(current, current)) {
			return current;
		}
	}

	return null;
};