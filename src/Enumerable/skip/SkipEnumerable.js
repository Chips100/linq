Enumerable.prototype.skip = function(number) {
	return new SkipEnumerable(this, number);
};

function SkipEnumerable(source, number) {
	LinqUtils.checkEnumerableArgument(source, 'source');
	LinqUtils.checkNumberArgument(number, 'number');
	
	this._source = source;
	this._number = number;
}

SkipEnumerable.prototype = Object.create(Enumerable.prototype);

SkipEnumerable.prototype.getEnumerator = function() {
	return new SkipEnumerator(this._source, this._number);
};