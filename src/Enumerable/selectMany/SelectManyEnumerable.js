Enumerable.prototype.selectMany = function(collectionSelector, resultSelector) {
	return new SelectManyEnumerable(this, collectionSelector, resultSelector);
};

function SelectManyEnumerable(source, collectionSelector, resultSelector) {
	LinqUtils.checkEnumerableArgument(source, 'source');
	LinqUtils.checkFunctionArgument(collectionSelector, 'collectionSelector');
	
	this._source = source;
	this._collectionSelector = collectionSelector;
	this._resultSelector = resultSelector;
}

SelectManyEnumerable.prototype = Object.create(Enumerable.prototype);

SelectManyEnumerable.prototype.getEnumerator = function() {
	return new SelectManyEnumerator(this._source, this._collectionSelector, this._resultSelector);
};

