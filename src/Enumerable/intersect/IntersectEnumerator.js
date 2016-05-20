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
		currentHash;
	
	// Iterate over the second sequence first to collect all values for finding intersections.
	if (!this._hasScannedSecond) {
		while(this._secondEnumerator.moveNext()) {
			current = this._secondEnumerator.getCurrent();
			currentHash = this._comparer.getHashCode(current);
		
			if (!this._seenElements[currentHash]) {
				this._seenElements[currentHash] = [current];	
			}
			else {
				this._seenElements[currentHash].push(current);
			}
		}		
		
		this._hasScannedSecond = true;
	}
	
	// Move next on the source sequence and check if there is an intersection in the second sequence.
	if (this._firstEnumerator.moveNext()) {
		current = this._firstEnumerator.getCurrent();
		currentHash = this._comparer.getHashCode(current);
		
		if (!this._seenElements[currentHash]) {
			// No element with the same hash, try the next one.
			return this.moveNext();
		}
		else {
			for (var i = this._seenElements[currentHash].length - 1; i >= 0; i--) {
				if (this._comparer.equals(current, this._seenElements[currentHash][i])) {

					// At this point we are willing to yield the element, because we found it in second sequence as well.
					// We have to make sure that this element has not been yielded before.
					if (!this._yieldedElements[currentHash]) {
						this._yieldedElements[currentHash] = [current];
						return true;
					}
					else {
						// The method is definitly going to exit in this iteration, so we can reuse the iterator variables.
						for (i = this._yieldedElements[currentHash].length - 1; i >= 0; i--) {							
							if (this._comparer.equals(current, this._yieldedElements[currentHash][i])) {
								// Already yielded the found item, try the next one.
								return this.moveNext();
							}		
						}
						
						// Remember that this item has been yielded to not yield it again.
						this._yieldedElements[currentHash].push(current);
						return true;
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