Enumerable.prototype.last = function(predicate) {
	var enumerator = this.getEnumerator(),
		current,
		lastMatchSet = false,
		lastMatch;
		
	// here we could have a huge performance boost by iterating from last to first.
	// this way, we call the predicate definitely for EVERY element.
	// but, in LINQ.NET it is not optimized either.
	// Jon Skeet has an interesting possible reason - what if the predicate function for an element would throw an exception?
	// http://msmvps.com/blogs/jon_skeet/archive/2010/12/29/reimplementing-linq-to-objects-part-11-first-single-last-and-the-ordefault-versions.aspx
	//
	// But then I wonder why first is not iterating over all items though
	while(enumerator.moveNext()) {
		current = enumerator.getCurrent();
		
		if (!predicate || predicate.call(current, current)) {
			lastMatchSet = true;
			lastMatch = current;
		}
	}
	
	if (!lastMatchSet) {
		throw new Error('no items matched the predicate or sequence was empty');
	}
	else {
		return lastMatch;
	}
};