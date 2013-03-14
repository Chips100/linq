function UnionEnumerable(first, second, comparer) {
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

UnionEnumerable.prototype = new Enumerable();

UnionEnumerable.prototype.getEnumerator = function() {
	return new UnionEnumerator(this._first, this._second, this._comparer);
};
