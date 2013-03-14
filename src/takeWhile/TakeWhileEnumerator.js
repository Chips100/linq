function TakeWhileEnumerator(enumerable, predicate) {
	this._enumerator = enumerable.getEnumerator();
	this._predicate = predicate;
	this.reset();
}

TakeWhileEnumerator.prototype.getCurrent = function() {
	if (!this._hasReachedEnd) {
		return this._enumerator.getCurrent();
	}
	else {
		throw new Error('Tried to call getCurrent() on invalid cursor position.');
	}
};

TakeWhileEnumerator.prototype.moveNext = function() {
	var current;
	
	this._index++;
	if (this._enumerator.moveNext()) {
		current = this._enumerator.getCurrent();
		if (this._predicate.call(current, current, this._index)) {
			return true;
		}
		else {
			this._hasReachedEnd = true;
			return false;
		}
	}
	else {
		return false;
	}
};

TakeWhileEnumerator.prototype.reset = function() {
	this._enumerator.reset();
	this._index = -1;
	this._hasReachedEnd = false;
};