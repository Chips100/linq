function SelectManyEnumerator(enumerable, collectionSelector, resultSelector) {
	this._enumerator = enumerable.getEnumerator();
	this._collectionSelector = collectionSelector;
	this._resultSelector = resultSelector;
	
	this.reset();
}

SelectManyEnumerator.prototype.getCurrent = function() {
	var current = this._currentEnumerator.getCurrent();
	
	if (this._resultSelector) {
		return this._resultSelector.call(this._currentElement, this._currentElement, current);
	}
	else {
		return current;
	}
};

SelectManyEnumerator.prototype.moveNext = function() {
	var currentCollection;
	
	if (!this._currentEnumerator || !this._currentEnumerator.moveNext()) {
		this._index++;
		if (this._enumerator.moveNext()) {
			this._currentElement = this._enumerator.getCurrent();
			currentCollection = this._collectionSelector.call(this._currentElement, this._currentElement, this._index);
			
			if (!(currentCollection instanceof Enumerable)) {
				currentCollection = new List(currentCollection);
			}
			this._currentEnumerator = currentCollection.getEnumerator();
			
			if (this._currentEnumerator.moveNext()) {
				return true;
			}
			else {
				//this collection of original enumeration element contains no elements
				//so we try to move to the next original enumeration element by calling this.moveNext
				return this.moveNext();
			}
		}
		else {
			//no more elements in original enumeration left.
			return false;
		}
	}
	else {
		return true;
	}
};

SelectManyEnumerator.prototype.reset = function() {
	this._enumerator.reset();
	this._index = -1;
	this._currentElement = undefined;
	this._currentEnumerator = undefined;
};