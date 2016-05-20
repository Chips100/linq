function DefaultIfEmptyEnumerator(source, defaultValue) {
	this._enumerator = source.getEnumerator();
	this._defaultValue = defaultValue;
}

DefaultIfEmptyEnumerator.prototype.getCurrent = function() {
	if (this._useSource) {
		return this._enumerator.getCurrent();
	}
	else {
		return this._defaultValue;
	}
};

DefaultIfEmptyEnumerator.prototype.moveNext = function() {
	if (!this._useSource && !this._useDefault) {
		this._useSource = this._enumerator.moveNext();
		this._useDefault = !this._useSource;
		return true;
	}
	else if (this._useSource) {
		return this._enumerator.moveNext();
	}
	else if (this._useDefault) {
		return false;
	}
};

DefaultIfEmptyEnumerator.prototype.reset = function() {
	this._useSource = false;
	this._useDefault = false;
	this._enumerator.reset();
};
