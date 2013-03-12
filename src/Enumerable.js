// Enumerable base class
function Enumerable(arr) {
	this._array = arr || [];
}

//gets an enumerator by an initial array
Enumerable.prototype.getEnumerator = function() {
	return new Enumerator(this._array);
};


/* prototype methods that can be applied to all enumerables */

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