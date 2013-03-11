function SkipEnumerator(enumerable, number) {
	this._enumerator = enumerable.getEnumerator();
	this._number = number;
	this.reset();
}

SkipEnumerator.prototype.getCurrent = function() {
	return this._enumerator.getCurrent();
};
SkipEnumerator.prototype.moveNext = function() {
	if (!this._hasSkippedFirstElements) {
		this._hasSkippedFirstElements = true;
		for (var i = this._number; i > 0; i--) {
			this._enumerator.moveNext();
		}
	}
	
	return this._enumerator.moveNext();
};
SkipEnumerator.prototype.reset = function() {
	this._enumerator.reset();
	this._hasSkippedFirstElements = false;
};