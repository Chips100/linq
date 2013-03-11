function Enumerable(arr) {
	this._array = arr || [];
}
Enumerable.prototype.getEnumerator = function() {
	return new Enumerator(this._array);
};

Enumerable.prototype.count = function() {
	var counter = 0,
		enumerator = this.getEnumerator();
		
	while(enumerator.moveNext()) {
		counter++;
	}
	
	return counter;
};
Enumerable.prototype.toArray = function() {
	var result = [],
		enumerator = this.getEnumerator();
		
	while(enumerator.moveNext()) {
		result.push(enumerator.getCurrent());
	}
	
	return result;
};


Enumerable.prototype.select = function(selector) {
	return new SelectEnumerable(this, selector);
};

Enumerable.prototype.skip = function(number) {
	return new SkipEnumerable(this, number);
};
Enumerable.prototype.skipWhile = function(predicate) {
	return new SkipWhileEnumerable(this, predicate);
};
Enumerable.prototype.take = function(number) {
	return new TakeEnumerable(this, number);
};


Enumerable.prototype.where = function(predicate) {
	return new WhereEnumerable(this, predicate);
};
