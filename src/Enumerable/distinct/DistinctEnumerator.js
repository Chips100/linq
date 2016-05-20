function DistinctEnumerator(source, comparer) {
	this._enumerator = source.getEnumerator();
	this._comparer = comparer;
	
	this.reset();
}

DistinctEnumerator.prototype.getCurrent = function() {
	return this._enumerator.getCurrent();
};

DistinctEnumerator.prototype.moveNext = function() {
	var current,
		currentHash,
		possibleDuplicate;
	
	if (this._enumerator.moveNext()) {
		current = this._enumerator.getCurrent();
		currentHash = this._comparer.getHashCode(current);
		
		if (!this._seenElements[currentHash]) {
			this._seenElements[currentHash] = [current];
			return true;
		}
		else {
			for (var i = this._seenElements[currentHash].length - 1; i >= 0; i--) {
				if (this._comparer.equals(current, this._seenElements[currentHash][i])) {
					return this.moveNext();
				}
			}
			
			this._seenElements[currentHash].push(current);
			return true;
		}
	}
	else {
		return false;
	}
};

DistinctEnumerator.prototype.reset = function() {
	this._seenElements = {};
	this._enumerator.reset();
};