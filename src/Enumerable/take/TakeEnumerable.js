Enumerable.prototype.take = function(number) {
	return new TakeEnumerable(this, number);
};

function TakeEnumerable(source, number) {
	LinqUtils.checkEnumerableArgument(source, 'source');
	LinqUtils.checkNumberArgument(number, 'number');
	
	this._source = source;
	this._number = number;
}

TakeEnumerable.prototype = Object.create(Enumerable.prototype);

TakeEnumerable.prototype.getEnumerator = function() {
	return new TakeEnumerator(this._source, this._number);
};