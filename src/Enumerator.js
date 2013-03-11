function Enumerator(arr) {
	this._array = arr || [];
	this.reset();
}
Enumerator.prototype.getCurrent = function() {
	return this._array[this._index];
};
Enumerator.prototype.moveNext = function() {
	return ++this._index < this._count;
};
Enumerator.prototype.reset = function() {
	this._index = -1;
	this._count = this._array.length;
};