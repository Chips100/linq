function RangeEnumerable(start, count) {
	if (isNaN(start)) {
		throw new Error('invalid start parameter: ' + start);
	}
	if (isNaN(count) || +count < 0) {
		throw new Error('invalid count parameter: ' + count);
	}
	
	this._start = +start;
	this._count = +count;
}

RangeEnumerable.prototype = new Enumerable();

RangeEnumerable.prototype.getEnumerator = function() {
	return new RangeEnumerator(this._start, this._count);
};
