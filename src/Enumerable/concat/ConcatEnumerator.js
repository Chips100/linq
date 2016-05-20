function ConcatEnumerator(first, second) {
	this._firstEnumerator = first.getEnumerator();
	this._secondEnumerator = second.getEnumerator();
	
	this.reset();
}

ConcatEnumerator.prototype.getCurrent = function() {
	if (this._isFirstActive) {
		return this._firstEnumerator.getCurrent();
	}
	else {
		return this._secondEnumerator.getCurrent();
	}
};

ConcatEnumerator.prototype.moveNext = function() {
	if (this._isFirstActive) {
		if (this._firstEnumerator.moveNext()) {
			return true;
		}
		else {
			this._isFirstActive = false;
			return this.moveNext();
		}
	}
	else {
		return this._secondEnumerator.moveNext();
	}
};

ConcatEnumerator.prototype.reset = function() {
	this._secondEnumerator.reset();
	this._firstEnumerator.reset();
	this._isFirstActive = true;
};