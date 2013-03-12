function SelectManyEnumerable(enumerable, collectionSelector, resultSelector) {
	this._enumerable = enumerable || new Enumerable();
	this._collectionSelector = collectionSelector;
	this._resultSelector = resultSelector;
}

SelectManyEnumerable.prototype = new Enumerable();

SelectManyEnumerable.prototype.getEnumerator = function() {
	return new SelectManyEnumerator(this._enumerable, this._collectionSelector, this._resultSelector);
}
