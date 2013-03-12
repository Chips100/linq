// Enumerable base class
function Enumerable(arr) {
	this._array = arr || [];
}


//gets an enumerator by an initial array
Enumerable.prototype.getEnumerator = function() {
	return new Enumerator(this._array);
};


/* Static methods on Enumerable function object */

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