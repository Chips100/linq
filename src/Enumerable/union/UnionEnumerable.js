Enumerable.prototype.union = function(second, comparer) {
	return new UnionEnumerable(this, second, comparer);
};

function UnionEnumerable(first, second, comparer) {
	LinqUtils.checkEnumerableArgument(first, 'first');
	LinqUtils.checkEnumerableArgument(second, 'second');
	
	this._first = first;
	this._second = second;
	this._comparer = comparer;	
}

UnionEnumerable.prototype = Object.create(Enumerable.prototype);

UnionEnumerable.prototype.getEnumerator = function() {
	return new UnionEnumerator(this._first, this._second, this._comparer);
};