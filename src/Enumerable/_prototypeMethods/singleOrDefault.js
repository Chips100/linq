/**
 * @file Adds the singleOrDefault method to the Enumerable prototype.
 * @author Chips100
 */

/** @this Enumerable 
 * Returns the only element of a sequence, or a default value if the sequence is empty; this method throws an exception if there is more than one element in the sequence.
 * @param {Function} [predicate] - A function to test an element for a condition. If omitted, the only item is used.
 * @returns {*} The single element of the input sequence that satisfies the condition, or null if no such element is found.
 */
Enumerable.prototype.singleOrDefault = function(predicate) {
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
		return null;
	}
	else {
		return returnValue;
	}
};