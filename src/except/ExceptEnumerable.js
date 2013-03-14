function ExceptEnumerable(first, second, comparer) {
	if (!first || !(first instanceof Enumerable)) {
		throw new Error('invalid first parameter');
	}
	if (!second || !(second instanceof Enumerable)) {
		throw new Error('invalid second parameter');
	}
	
	this._first = first;
	this._second = second;
	this._comparer = comparer;
}

ExceptEnumerable.prototype = new Enumerable();

ExceptEnumerable.prototype.getEnumerator = function() {
	return new ExceptEnumerator(this._first, this._second, this._comparer);
};


Enumerable.prototype.except = function(second, comparer) {
	return new ExceptEnumerable(this, second, comparer);
};
