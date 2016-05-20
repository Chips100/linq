Enumerable.prototype.except = function(second, comparer) {
	return new ExceptEnumerable(this, second, comparer);
};

function ExceptEnumerable(first, second, comparer) {
	LinqUtils.checkEnumerableArgument(first, 'first');
	LinqUtils.checkEnumerableArgument(second, 'second');
	
	this._first = first;
	this._second = second;
	this._comparer = LinqUtils.createEqualityComparer(comparer);
}

ExceptEnumerable.prototype = Object.create(Enumerable);

ExceptEnumerable.prototype.getEnumerator = function() {
	return new ExceptEnumerator(this._first, this._second, this._comparer);
};

