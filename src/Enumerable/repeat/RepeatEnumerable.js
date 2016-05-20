Enumerable.repeat = function(element, count) {
	return new RepeatEnumerable(element, count);
};

function RepeatEnumerable(element, count) {
	LinqUtils.checkPositiveNumberArgument(count, 'count');
	
	this._element = element;
	this._count = count;
}

RepeatEnumerable.prototype = Object.create(Enumerable.prototype);

RepeatEnumerable.prototype.getEnumerator = function() {
	return new RepeatEnumerator(this._element, this._count);
};