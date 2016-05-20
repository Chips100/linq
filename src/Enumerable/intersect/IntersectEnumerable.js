Enumerable.prototype.intersect = function(second, comparer) {
	return new IntersectEnumerable(this, second, comparer);
};

function IntersectEnumerable(first, second, comparer) {
	LinqUtils.checkEnumerableArgument(first, 'first');
	LinqUtils.checkEnumerableArgument(second, 'second');
	
	this._first = first;
	this._second = second;
	this._comparer = comparer;
}

IntersectEnumerable.prototype = Object.create(Enumerable.prototype);

IntersectEnumerable.prototype.getEnumerator = function() {
	return new IntersectEnumerator(this._first, this._second, this._comparer);
};