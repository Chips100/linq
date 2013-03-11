function TakeWhileEnumerable(enumerable, predicate) {
	this._enumerable = enumerable || new Enumerable();
	this._predicate = predicate;
}

TakeWhileEnumerable.prototype = new Enumerable();

TakeWhileEnumerable.prototype.getEnumerator = function() {
	return new TakeWhileEnumerator(this._enumerable, this._predicate);
}
