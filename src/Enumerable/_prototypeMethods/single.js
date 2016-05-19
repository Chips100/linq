/**
 * @file Adds the single method to the Enumerable prototype.
 * @author Chips100
 */

/** @this Enumerable 
 * Returns the only element of a sequence that satisfies a specified condition, and throws an exception if more than one such element exists.
 * @param {Function} [predicate] - A function to test an element for a condition. If omitted, the only item is used.
 * @returns {*} The single element of the input sequence that satisfies a condition.
 */
Enumerable.prototype.single = function(predicate) {
	var enumerator = this.getEnumerator(),
		current,
		returnValueSet = false,
		returnValue;
		
	while(enumerator.moveNext()) {
		current = enumerator.getCurrent();
		if (!LinqUtils.isFunction(predicate) || predicate.call(current, current)) {
			if(!returnValueSet) {
				returnValueSet = true;
				returnValue = current;
			}
			else {
				LinqUtils.throwMultipleMatchingItemsError();
			}
		}
	}
	
	if (!returnValueSet) {
		LinqUtils.throwNoMatchingItemError();
	}
	else {
		return returnValue;
	}
};