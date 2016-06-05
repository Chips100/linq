/**
 * @file Adds the lastOrDefault method to the Enumerable prototype.
 * @author Chips100
 */

/** @this Enumerable 
 * Returns the last element of the sequence that satisfies a condition or a default value if no such element is found.
 * @param {Function} [predicate] - A function to test each element for a condition. If omitted, the last item from the sequence is used.
 * @returns {*} null if source is empty or if no element passes the test specified by predicate; otherwise, the last element in source that passes the test specified by predicate.
 */
Enumerable.prototype.lastOrDefault = function (predicate) {
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
		return null;
	}
	else {
		return lastMatch;
	}
};