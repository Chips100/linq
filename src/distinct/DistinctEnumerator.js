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
		currentHash = current.toString();
		
		if (!this._seenElements[currentHash]) {
			this._seenElements[currentHash] = [current];
			return true;
		}
		else {
			for (var i = this._seenElements[currentHash].length - 1; i >= 0; i--) {
				possibleDuplicate = this._seenElements[currentHash][i];
				if (!this._comparer ? possibleDuplicate === current : this._comparer.call(current, current, possibleDuplicate)) {
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
