function SelectEnumerator(enumerable, selector) {
	this._enumerator = enumerable.getEnumerator();
	this._selector = selector;
	this.reset();
}

SelectEnumerator.prototype.getCurrent = function() {
	var current = this._enumerator.getCurrent();
	
	return this._selector.call(current, current, this._index);
};

SelectEnumerator.prototype.moveNext = function() {
	this._index++;
	return this._enumerator.moveNext();
};

SelectEnumerator.prototype.reset = function() {
	this._enumerator.reset();
	this._index = -1;
};