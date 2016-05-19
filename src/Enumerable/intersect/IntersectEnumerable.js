function IntersectEnumerable(first, second, comparer) {
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

IntersectEnumerable.prototype = new Enumerable();

IntersectEnumerable.prototype.getEnumerator = function() {
	return new IntersectEnumerator(this._first, this._second, this._comparer);
};


Enumerable.prototype.intersect = function(second, comparer) {
	return new IntersectEnumerable(this, second, comparer);
};
