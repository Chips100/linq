/**
 * @file Adds the single method to the Enumerable prototype.
 * @author Chips100
 */

/** Returns the only element of a sequence that satisfies a specified condition, and throws an exception if more than one such element exists.
 * @this Enumerable
 * @param {Function} [predicate] - A function to test an element for a condition. If omitted, the only item is used.
 * @returns {*} The single element of the input sequence that satisfies a condition.
 */
Enumerable.prototype.single = function (predicate) {
	var enumerator = this.getEnumerator(),
		current,
		returnValueSet = false,
		returnValue;

	while (enumerator.moveNext()) {
		current = enumerator.getCurrent();
		if (!LinqUtils.isFunction(predicate) || predicate.call(current, current)) {
			if (!returnValueSet) {
				returnValueSet = true;
				returnValue = current;
			}
			else {
				LinqAssert.throwMultipleMatchingItemsError();
			}
		}
	}

	if (!returnValueSet) {
		LinqAssert.throwNoMatchingItemError();
	}
	else {
		return returnValue;
	}
};