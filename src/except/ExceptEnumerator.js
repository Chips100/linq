function ExceptEnumerator(first, second, comparer) {
	this._firstEnumerator = first.getEnumerator();
	this._secondEnumerator = second.getEnumerator();
	this._comparer = comparer;
	
	this.reset();
}

ExceptEnumerator.prototype.getCurrent = function() {
	return this._firstEnumerator.getCurrent();
};

ExceptEnumerator.prototype.moveNext = function() {
	var current,
		currentHash,
		possibleDuplicate,
		wasDuplicateFound;
	
	if (!this._hasScannedSecond) {
		while(this._secondEnumerator.moveNext()) {
			current = this._secondEnumerator.getCurrent();
			currentHash = current.toString();
		
			if (!this._bannedElements[currentHash]) {
				this._bannedElements[currentHash] = [current];	
			}
			else {
				wasDuplicateFound = false;
				for (var i = this._bannedElements[currentHash].length - 1; i >= 0; i--) {
					possibleDuplicate = this._bannedElements[currentHash][i];
					if (!this._comparer ? possibleDuplicate === current : this._comparer.call(current, current, possibleDuplicate)) {
						wasDuplicateFound = true;
						break;
					}
				}
				
				if (!wasDuplicateFound) {
					this._bannedElements[currentHash].push(current);
				}
			}
		}		
		
		this._hasScannedSecond = true;
	}
	
	if (this._firstEnumerator.moveNext()) {
		current = this._firstEnumerator.getCurrent();
		currentHash = current.toString();
		
		if (!this._bannedElements[currentHash]) {
			this._bannedElements[currentHash] = [current];
			return true;
		}
		else {
			for (var i = this._bannedElements[currentHash].length - 1; i >= 0; i--) {
				possibleDuplicate = this._bannedElements[currentHash][i];
				if (!this._comparer ? possibleDuplicate === current : this._comparer.call(current, current, possibleDuplicate)) {
					return this.moveNext();
				}
			}
			
			this._bannedElements[currentHash].push(current);
			return true;
		}
	}
	else {
		return false;
	}
};

ExceptEnumerator.prototype.reset = function() {
	this._firstEnumerator.reset();
	this._secondEnumerator.reset();
	this._hasScannedSecond = false;
	this._bannedElements = {};
};
