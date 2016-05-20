Enumerable.prototype.skipWhile = function(predicate) {
	return new SkipWhileEnumerable(this, predicate);
};

function SkipWhileEnumerable(source, predicate) {
	LinqUtils.checkEnumerableArgument(source, 'source');
	LinqUtils.checkFunctionArgument(predicate, 'predicate');
	
	this._source = source;
	this._predicate = predicate;
}

SkipWhileEnumerable.prototype = Object.create(Enumerable.prototype);

SkipWhileEnumerable.prototype.getEnumerator = function() {
	return new SkipWhileEnumerator(this._source, this._predicate);
};