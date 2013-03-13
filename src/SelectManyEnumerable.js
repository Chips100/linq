function SelectManyEnumerable(source, collectionSelector, resultSelector) {
	if (!source || !(source instanceof Enumerable)) {
		throw new Error('invalid source parameter: ' + source);
	}
	if (!collectionSelector || typeof(collectionSelector) !== 'function') {
		throw new Error('invalid collectionSelector parameter: ' + collectionSelector);
	}
	
	this._source = source;
	this._collectionSelector = collectionSelector;
	this._resultSelector = resultSelector;
}

SelectManyEnumerable.prototype = new Enumerable();

SelectManyEnumerable.prototype.getEnumerator = function() {
	return new SelectManyEnumerator(this._source, this._collectionSelector, this._resultSelector);
}
