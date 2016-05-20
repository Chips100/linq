Enumerable.prototype.where = function(predicate) {
	return new WhereEnumerable(this, predicate);
};

function WhereEnumerable(source, predicate) {
	LinqUtils.checkEnumerableArgument(source, 'source');
	LinqUtils.checkFunctionArgument(predicate, 'predicate');
	
	this._source = source;
	this._predicate = predicate;
}

WhereEnumerable.prototype = Object.create(Enumerable.prototype);

WhereEnumerable.prototype.getEnumerator = function() {
	return new WhereEnumerator(this._source, this._predicate);
};