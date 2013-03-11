function WhereEnumerator(enumerable, predicate) {
	this._enumerator = enumerable.getEnumerator();
	this._predicate = predicate;
	this.reset();
}

WhereEnumerator.prototype.getCurrent = function() {
	return this._enumerator.getCurrent();
};
WhereEnumerator.prototype.moveNext = function() {
	var current;
	
	while(this._enumerator.moveNext()) {
		current = this._enumerator.getCurrent();
		if (this._predicate.call(current, current, ++this._index)) {
			return true;
		}
	}
	
	return false;
};
WhereEnumerator.prototype.reset = function() {
	this._enumerator.reset();
	this._index = -1;
};