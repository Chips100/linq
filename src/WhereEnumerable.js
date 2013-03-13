function WhereEnumerable(source, predicate) {
	if (!source || !(source instanceof Enumerable)) {
		throw new Error('invalid source parameter: ' + source);
	}
	if (!predicate || typeof(predicate) !== 'function') {
		throw new Error('invalid predicate parameter: ' + predicate);
	}
	
	this._source = source;
	this._predicate = predicate;
}

WhereEnumerable.prototype = new Enumerable();

WhereEnumerable.prototype.getEnumerator = function() {
	return new WhereEnumerator(this._source, this._predicate);
}
