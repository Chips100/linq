function SkipWhileEnumerator(enumerable, predicate) {
	this._enumerator = enumerable.getEnumerator();
	this._predicate = predicate;
	this.reset();
}

SkipWhileEnumerator.prototype.getCurrent = function() {
	return this._enumerator.getCurrent();
};

SkipWhileEnumerator.prototype.moveNext = function() {
	var current;
	
	if (!this._hasSkippedFirstElements) {
		this._hasSkippedFirstElements = true;
		
		while(this._enumerator.moveNext()) {
			this._index++;
			current = this._enumerator.getCurrent();
			if (!this._predicate.call(current, current, this._index)) {
				return true;
			}
		}
		
		return false;
	}
	else {
		return this._enumerator.moveNext();
	}
};

SkipWhileEnumerator.prototype.reset = function() {
	this._enumerator.reset();
	this._hasSkippedFirstElements = false;
	this._index = -1;
};