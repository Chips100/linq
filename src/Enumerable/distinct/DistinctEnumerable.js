Enumerable.prototype.distinct = function(comparer) {
	return new DistinctEnumerable(this, comparer);
};

function DistinctEnumerable(source, comparer) {
	LinqUtils.checkEnumerableArgument(source, 'source');
	
	this._source = source;
	this._comparer = LinqUtils.createEqualityComparer(comparer);
}

DistinctEnumerable.prototype = Object.create(Enumerable.prototype);

DistinctEnumerable.prototype.getEnumerator = function() {
	return new DistinctEnumerator(this._source, this._comparer);
};

