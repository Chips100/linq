function SkipWhileEnumerable(enumerable, predicate) {
	this._enumerable = enumerable || new Enumerable();
	this._predicate = predicate;
}

SkipWhileEnumerable.prototype = new Enumerable();

SkipWhileEnumerable.prototype.getEnumerator = function() {
	return new SkipWhileEnumerator(this._enumerable, this._predicate);
}


Enumerable.prototype.skipWhile = function(predicate) {
	return new SkipWhileEnumerable(this, predicate);
};