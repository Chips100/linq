Enumerable.prototype.concat = function(second) {
	return new ConcatEnumerable(this, second);
}

function ConcatEnumerable(first, second) {
	LinqUtils.checkEnumerableArgument(first, 'first');
	LinqUtils.checkEnumerableArgument(second, 'second');
	
	this._first = first;
	this._second = second;
}

ConcatEnumerable.prototype = Object.create(Enumerable.prototype);

ConcatEnumerable.prototype.getEnumerator = function() {
	return new ConcatEnumerator(this._first, this._second);
};