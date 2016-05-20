Enumerable.prototype.takeWhile = function(predicate) {
	return new TakeWhileEnumerable(this, predicate);
};

function TakeWhileEnumerable(source, predicate) {
	LinqUtils.checkEnumerableArgument(source, 'source');
	LinqUtils.checkFunctionArgument(predicate, 'predicate');
	
	this._source = source;
	this._predicate = predicate;
}

TakeWhileEnumerable.prototype = Object.create(Enumerable.prototype);

TakeWhileEnumerable.prototype.getEnumerator = function() {
	return new TakeWhileEnumerator(this._source, this._predicate);
};