function UnionEnumerator(first, second, comparer) {
	this._firstEnumerator = first.getEnumerator();
	this._secondEnumerator = second.getEnumerator();
	this._comparer = comparer;
	
	this.reset();
}

UnionEnumerator.prototype.getCurrent = function() {
	if (this._isFirstActive) {
		return this._firstEnumerator.getCurrent();
	}
	else {
		return this._secondEnumerator.getCurrent();
	}
};

UnionEnumerator.prototype.moveNext = function() {	
	var current,
		foundItem = false,
		currentHash;
	
	if (this._isFirstActive) {
		if (this._firstEnumerator.moveNext()) {
			foundItem = true;
			current = this._firstEnumerator.getCurrent();
		}
		else {
			// First sequence is exhausted, try the second one by this.moveNext().
			this._isFirstActive = false;
			return this.moveNext();
		}
	}
	else {
		if (this._secondEnumerator.moveNext()) {
			foundItem = true;
			current = this._secondEnumerator.getCurrent();
		}
	}
	
	if (foundItem) {
		// We found another item. Make sure it has not already been yielded.
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

UnionEnumerator.prototype.reset = function() {
	this._firstEnumerator.reset();
	this._secondEnumerator.reset();
	this._isFirstActive = true;
	this._seenElements = {};
};