function DistinctEnumerable(source, comparer) {
	if (!source || !(source instanceof Enumerable)) {
		throw new Error('invalid source parameter: ' + source);
	}
	
	this._source = source;
	this._comparer = comparer;
}

DistinctEnumerable.prototype = new Enumerable();

DistinctEnumerable.prototype.getEnumerator = function() {
	return new DistinctEnumerator(this._source, this._comparer);
};
