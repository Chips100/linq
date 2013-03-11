// Default enumerator
// Enumerates over a supplied array.
function Enumerator(arr) {
	this._array = arr || [];
	this.reset();
}

// gets the element at the current position
Enumerator.prototype.getCurrent = function() {
	return this._array[this._index];
};

// moves to the next item in the enumeration.
// returns false if end of enumeration is reached.
Enumerator.prototype.moveNext = function() {
	return ++this._index < this._count;
};

// resets the current position to the start of the enumeration
Enumerator.prototype.reset = function() {
	this._index = -1;
	this._count = this._array.length;
};