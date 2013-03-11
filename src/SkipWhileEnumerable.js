function SkipWhileEnumerable(enumerable, predicate) {
	this._enumerable = enumerable || new Enumerable();
	this._predicate = predicate;
}

SkipWhileEnumerable.prototype = new Enumerable();

SkipWhileEnumerable.prototype.getEnumerator = function() {
	return new SkipWhileEnumerator(this._enumerable, this._predicate);
}
