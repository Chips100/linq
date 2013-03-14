function RepeatEnumerable(element, count) {
	if (isNaN(count) || +count < 0) {
		throw new Error('invalid count parameter: ' + count);
	}
	
	this._element = element;
	this._count = count;
}

RepeatEnumerable.prototype = new Enumerable();

RepeatEnumerable.prototype.getEnumerator = function() {
	return new RepeatEnumerator(this._element, this._count);
};


Enumerable.repeat = function(element, count) {
	return new RepeatEnumerable(element, count);
}