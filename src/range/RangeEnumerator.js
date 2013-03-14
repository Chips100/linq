function RangeEnumerator(start, count) {
	this._start = start;
	this._end = start + count;
	
	this.reset();
}

RangeEnumerator.prototype.getCurrent = function() {
	if (this._index <= (this._start) || this._index > this._end ) {
		throw new Error('invalid cursor position');
	}
	
	return this._index - 1;
};

RangeEnumerator.prototype.moveNext = function() {
	return this._index++ < (this._end);
};

RangeEnumerator.prototype.reset = function() {
	this._index = this._start;
};
