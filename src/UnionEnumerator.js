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
		currentSet = false,
		currentHash,
		possibleDuplicate;
	
	if (this._isFirstActive) {
		if (this._firstEnumerator.moveNext()) {
			currentSet = true;
			current = this._firstEnumerator.getCurrent();
		}
		else {
			this._isFirstActive = false;
			return this.moveNext();
		}
	}
	else {
		if (this._secondEnumerator.moveNext()) {
			currentSet = true;
			current = this._secondEnumerator.getCurrent();
		}
	}
	
	if (currentSet) {
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

UnionEnumerator.prototype.reset = function() {
	this._firstEnumerator.reset();
	this._secondEnumerator.reset();
	this._isFirstActive = true;
	this._seenElements = {};
};