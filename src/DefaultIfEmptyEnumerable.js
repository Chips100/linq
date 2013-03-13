function DefaultIfEmptyEnumerable(source, defaultValue) {
	if (!source || !(source instanceof Enumerable)) {
		throw new Error('invalid source parameter: ' + source);
	}
	
	this._source = source;
	this._defaultValue = defaultValue;
}

DefaultIfEmptyEnumerable.prototype = new Enumerable();

DefaultIfEmptyEnumerable.prototype.getEnumerator = function() {
	return new DefaultIfEmptyEnumerator(this._source, this._defaultValue);
};
