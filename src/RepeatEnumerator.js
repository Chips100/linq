function RepeatEnumerator(element, count) {
	this._element = element;
	this._count = +count;
	
	if (this._count < 0 || isNaN(this._count)) {
		throw new Error('Invalid count parameter for Enumerable.repeat');
	}
	
	this.reset();
}

RepeatEnumerator.prototype.getCurrent = function() {
	if (this._index >= 0 && this._index < this._count) {
		return this._element;
	}
	else {
		throw new Error('Tried to call getCurrent() on invalid cursor position.');
	}
}
RepeatEnumerator.prototype.moveNext = function() {
	return ++this._index < this._count;
};
RepeatEnumerator.prototype.reset = function() {
	this._index = -1;
};
