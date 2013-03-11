function WhereEnumerable(enumerable, predicate) {
	this._enumerable = enumerable || new Enumerable();
	this._predicate = predicate;
}

WhereEnumerable.prototype = new Enumerable();

WhereEnumerable.prototype.getEnumerator = function() {
	return new WhereEnumerator(this._enumerable, this._predicate);
}
