Enumerable.prototype.defaultIfEmpty = function(defaultValue) {
	return new DefaultIfEmptyEnumerable(this, defaultValue);
};

function DefaultIfEmptyEnumerable(source, defaultValue) {
	LinqUtils.checkEnumerableArgument(source, 'source');
	
	this._source = source;
	this._defaultValue = defaultValue;
}

DefaultIfEmptyEnumerable.prototype = Object.create(Enumerable.prototype);

DefaultIfEmptyEnumerable.prototype.getEnumerator = function() {
	return new DefaultIfEmptyEnumerator(this._source, this._defaultValue);
};

