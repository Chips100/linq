/**
 * @file Adds the first method to the Enumerable prototype.
 * @author Chips100
 */

/** @this Enumerable 
 * Returns the first element in a sequence that satisfies a specified condition.
 * @param {Function} [predicate] - A function to test each element for a condition. If omitted, the first item from the sequence is used.
 * @returns {*} The first element in the sequence that passes the test in the specified predicate function.
 */
Enumerable.prototype.first = function(predicate) {
	var enumerator = this.getEnumerator(),
		current;
		
	while(enumerator.moveNext()) {
		current = enumerator.getCurrent();
		
		if (!LinqUtils.isFunction(predicate) || predicate.call(current, current)) {
			return current;
		}
	}
	
	LinqUtils.throwNoMatchingItemError();
};