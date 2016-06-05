/**
 * @file Adds the last method to the Enumerable prototype.
 * @author Chips100
 */

/** @this Enumerable 
 * Returns the last element in a sequence that satisfies a specified condition.
 * @param {Function} [predicate] - A function to test each element for a condition. If omitted, the last item from the sequence is used.
 * @returns {*} The last element in the sequence that passes the test in the specified predicate function.
 */
Enumerable.prototype.last = function (predicate) {
	var enumerator = this.getEnumerator(),
		current,
		lastMatchSet = false,
		lastMatch;

	// Here we could have a potential performance boost by iterating from last to first.
	// With the current implementation, we have to call the predicate for every element.
	// In LINQ.NET it is not optimized either.
	// Jon Skeet has an interesting possible reason - what if the predicate function for an element would throw an exception?
	// http://msmvps.com/blogs/jon_skeet/archive/2010/12/29/reimplementing-linq-to-objects-part-11-first-single-last-and-the-ordefault-versions.aspx
	while (enumerator.moveNext()) {
		current = enumerator.getCurrent();

		if (!LinqUtils.isFunction(predicate) || predicate.call(current, current)) {
			lastMatchSet = true;
			lastMatch = current;
		}
	}

	if (!lastMatchSet) {
		LinqAssert.throwNoMatchingItemError();
	}
	else {
		return lastMatch;
	}
};