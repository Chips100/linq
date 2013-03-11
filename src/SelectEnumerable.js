function SelectEnumerable(enumerable, selector) {
	this._enumerable = enumerable || new Enumerable();
	this._selector = selector;
}

SelectEnumerable.prototype = new Enumerable();

SelectEnumerable.prototype.getEnumerator = function() {
	return new SelectEnumerator(this._enumerable, this._selector);
}
