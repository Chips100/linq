// Enumerable base class
function Enumerable(arr) {
	this._array = arr || [];
}


//gets an enumerator by an initial array
Enumerable.prototype.getEnumerator = function() {
	return new Enumerator(this._array);
};


/* Static methods on Enumerable function object */

Enumerable.empty = function() {
	return new Enumerable([]);
};

Enumerable.range = function(start, count) {
	return new RangeEnumerable(start, count);
};

// creates an enumerable that repeats a given element a specified number of times.
Enumerable.repeat = function(element, count) {
	return new RepeatEnumerable(element, count);
}



/* prototype methods that can be applied to all enumerables */


Enumerable.prototype.aggregate = function(seed, func, resultSelector) {
	var enumerator = this.getEnumerator(),
		current,
		aggregation;
	
	//check if seed parameter was actually omitted
	if (typeof(seed) === 'function') {
		if (typeof(func) === 'function') {
			resultSelector = func;
		}
		
		func = seed;
		
		enumerator.moveNext();
		seed = enumerator.getCurrent();
	}
	
	aggregation = seed;
	while(enumerator.moveNext()) {
		current = enumerator.getCurrent();
		aggregation = func.call(current, aggregation, current);
	}
	
	if (!resultSelector) {
		return aggregation;
	}
	else {
		return resultSelector.call(aggregation, aggregation);
	}
};



// returns true if all elements meet a specified condition
Enumerable.prototype.all = function(predicate) {
	if (!predicate || !(typeof(predicate) !== 'function')) {
		throw new Error('invalid predicate parameter: ' + predicate);	
	}
	
	var enumerator = this.getEnumerator(),
		current;
	
	while(enumerator.moveNext()) {
		current = enumerator.getCurrent();
		if (!predicate.call(current, current)) {
			return false;
		}
	}
	
	return true;
};

Enumerable.prototype.any = function(predicate) {
	var enumerator = this.getEnumerator(),
		current;
	
	if (!predicate) {
		return enumerator.moveNext();
	}
	else {
		while(enumerator.moveNext()) {
			current = enumerator.getCurrent();
			if (predicate.call(current, current)) {
				return true;
			}
		}
		
		return false;
	}
};


Enumerable.prototype.concat = function(second) {
	return new ConcatEnumerable(this, second);
}

// returns true if enumerable contains specified value, compared using the specified comparer
Enumerable.prototype.contains = function(value, comparer) {
	var enumerator = this.getEnumerator(),
		current;
	
	while(enumerator.moveNext()) {
		current = enumerator.getCurrent();
		if ((comparer && comparer.call(current, current, value)) || current === value) {
			return true;	
		}
	}
	
	return false;
};


// returns the number of elements in this enumerable.
Enumerable.prototype.count = function(predicate) {
	var counter = 0,
		current,
		enumerator = this.getEnumerator();
		
	while(enumerator.moveNext()) {
		if (!predicate || predicate.call(current = enumerator.getCurrent(), current)) {
			counter++;
		}
	}
	
	return counter;
};

Enumerable.prototype.first = function(predicate) {
	var enumerator = this.getEnumerator(),
		current;
		
	while(enumerator.moveNext()) {
		current = enumerator.getCurrent();
		
		if (!predicate || predicate.call(current, current)) {
			return current;
		}
	}
	
	throw new Error('no items matched the predicate or sequence was empty');
}
Enumerable.prototype.firstOrDefault = function(predicate) {
	var enumerator = this.getEnumerator(),
		current;
		
	while(enumerator.moveNext()) {
		current = enumerator.getCurrent();
		
		if (!predicate || predicate.call(current, current)) {
			return current;
		}
	}
	
	return null;
}


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


Enumerable.prototype.lastOrDefault = function(predicate) {
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
		return null;
	}
	else {
		return lastMatch;
	}
};


Enumerable.prototype.single = function(predicate) {
	var enumerator = this.getEnumerator(),
		current,
		returnValueSet = false,
		returnValue;
		
	while(enumerator.moveNext()) {
		current = enumerator.getCurrent();
		if (!predicate || predicate.call(current, current)) {
			if(!returnValueSet) {
				returnValueSet = true;
				returnValue = current;
			}
			else {
				throw new Error('sequence contained multiple matching elements');
			}
		}
	}
	
	if (!returnValueSet) {
		throw new Error('no items matched the predicate or sequence was empty');
	}
	else {
		return returnValue;
	}
};

Enumerable.prototype.singleOrDefault = function(predicate) {
	var enumerator = this.getEnumerator(),
		current,
		returnValueSet = false,
		returnValue;
		
	while(enumerator.moveNext()) {
		current = enumerator.getCurrent();
		if (!predicate || predicate.call(current, current)) {
			if(!returnValueSet) {
				returnValueSet = true;
				returnValue = current;
			}
			else {
				throw new Error('sequence contained multiple matching elements');
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



// transforms this enumerable into an array.
Enumerable.prototype.toArray = function() {
	var result = [],
		enumerator = this.getEnumerator();
		
	while(enumerator.moveNext()) {
		result.push(enumerator.getCurrent());
	}
	
	return result;
};



/* prototype extensions for using enumerables */

// applies a selector function to all elements in this enumerable.
Enumerable.prototype.select = function(selector) {
	return new SelectEnumerable(this, selector);
};

// applies a selector function to all elements in this enumerable and flattens the results.
Enumerable.prototype.selectMany = function(collectionSelector, resultSelector) {
	return new SelectManyEnumerable(this, collectionSelector, resultSelector);
};

// skips a specified number of elements this enumerable.
Enumerable.prototype.skip = function(number) {
	return new SkipEnumerable(this, number);
};

// skips elements in this enumerable until a condition is met.
Enumerable.prototype.skipWhile = function(predicate) {
	return new SkipWhileEnumerable(this, predicate);
};

// takes a specified number of elements from this enumerable.
Enumerable.prototype.take = function(number) {
	return new TakeEnumerable(this, number);
};

// takes elements from this enumerable as long as a specified condition is met.
Enumerable.prototype.takeWhile = function(predicate) {
	return new TakeWhileEnumerable(this, predicate);
};

// reduces this enumerable to those elements that meet the specified condition.
Enumerable.prototype.where = function(predicate) {
	return new WhereEnumerable(this, predicate);
};