function IntersectEnumerator(first, second, comparer) {
	this._firstEnumerator = first.getEnumerator();
	this._secondEnumerator = second.getEnumerator();
	this._comparer = comparer;
	
	this.reset();
}

IntersectEnumerator.prototype.getCurrent = function() {
	return this._firstEnumerator.getCurrent();
};

IntersectEnumerator.prototype.moveNext = function() {
	var current,
		currentHash,
		possibleDuplicate,
		wasDuplicateFound;
	
	if (!this._hasScannedSecond) {
		while(this._secondEnumerator.moveNext()) {
			current = this._secondEnumerator.getCurrent();
			currentHash = current.toString();
		
			if (!this._seenElements[currentHash]) {
				this._seenElements[currentHash] = [current];	
			}
			else {
				wasDuplicateFound = false;
				for (var i = this._seenElements[currentHash].length - 1; i >= 0; i--) {
					possibleDuplicate = this._seenElements[currentHash][i];
					if (!this._comparer ? possibleDuplicate === current : this._comparer.call(current, current, possibleDuplicate)) {
						wasDuplicateFound = true;
						break;
					}
				}
				
				if (!wasDuplicateFound) {
					this._seenElements[currentHash].push(current);
				}
			}
		}		
		
		this._hasScannedSecond = true;
	}
	
	if (this._firstEnumerator.moveNext()) {
		current = this._firstEnumerator.getCurrent();
		currentHash = current.toString();
		
		if (!this._seenElements[currentHash]) {
			return this.moveNext();
		}
		else {
			for (var i = this._seenElements[currentHash].length - 1; i >= 0; i--) {
				possibleDuplicate = this._seenElements[currentHash][i];
				if (!this._comparer ? possibleDuplicate === current : this._comparer.call(current, current, possibleDuplicate)) {

					//so, at this point we are willing to yield the element, because we found it in second sequence as well
					//we have to make sure that this element has not been yielded before.

					if (!this._yieldedElements[currentHash]) {
						this._yieldedElements[currentHash] = [current];
						return true;
					}
					else {
						wasDuplicateFound = false;
						
						// we are definitely exiting the method in this iteration.
						// so we can use the iterator variable i again.
						for (i = this._yieldedElements[currentHash].length - 1; i >= 0; i--) {
							possibleDuplicate = this._yieldedElements[currentHash][i];
							if (!this._comparer ? possibleDuplicate === current : this._comparer.call(current, current, possibleDuplicate)) {
								wasDuplicateFound = true;
								break;
							}		
						}
						
						if (!wasDuplicateFound) {
							this._yieldedElements[currentHash].push(current);
							return true;
						}
						else {
							return this.moveNext();
						}
					}
				}
			}
			
			return this.moveNext();
		}
	}
	else {
		return false;
	}
};

IntersectEnumerator.prototype.reset = function() {
	this._firstEnumerator.reset();
	this._secondEnumerator.reset();
	this._hasScannedSecond = false;
	this._seenElements = {};
	this._yieldedElements = {};
};
