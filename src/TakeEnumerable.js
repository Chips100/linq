function TakeEnumerable(enumerable, number) {
	this._enumerable = enumerable || new Enumerable();
	this._number = number;
}

TakeEnumerable.prototype = new Enumerable();

TakeEnumerable.prototype.getEnumerator = function() {
	return new TakeEnumerator(this._enumerable, this._number);
}
