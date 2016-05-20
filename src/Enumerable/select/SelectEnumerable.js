Enumerable.prototype.select = function(selector) {
	return new SelectEnumerable(this, selector);
};

function SelectEnumerable(source, selector) {
	LinqUtils.checkEnumerableArgument(source, 'source');
	LinqUtils.checkFunctionArgument(selector, 'selector');
	
	this._source = source;
	this._selector = selector;
}

SelectEnumerable.prototype = Object.create(Enumerable.prototype);

SelectEnumerable.prototype.getEnumerator = function() {
	return new SelectEnumerator(this._source, this._selector);
};