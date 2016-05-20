Enumerable.range = function(start, count) {
	return new RangeEnumerable(start, count);
};

function RangeEnumerable(start, count) {
	LinqUtils.checkNumberArgument(start, 'start');
	LinqUtils.checkPositiveNumberArgument(count, 'count');
	
	this._start = +start;
	this._count = +count;
}

RangeEnumerable.prototype = Object.create(Enumerable.prototype);

RangeEnumerable.prototype.getEnumerator = function() {
	return new RangeEnumerator(this._start, this._count);
};