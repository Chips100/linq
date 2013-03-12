function RepeatEnumerable(element, count) {
	this._element = element;
	this._count = count;
}

RepeatEnumerable.prototype = new Enumerable();

RepeatEnumerable.prototype.getEnumerator = function() {
	return new RepeatEnumerator(this._element, this._count);
};
