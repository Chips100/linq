function TakeEnumerator(enumerable, number) {
	this._enumerator = enumerable.getEnumerator();
	this._number = number;
	this.reset();
}

TakeEnumerator.prototype.getCurrent = function() {
	return this._enumerator.getCurrent();
};

TakeEnumerator.prototype.moveNext = function() {
	return this._count++ < this._number && this._enumerator.moveNext();
};

TakeEnumerator.prototype.reset = function() {
	this._enumerator.reset();
	this._count = 0;
};