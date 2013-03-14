function SkipEnumerable(enumerable, number) {
	this._enumerable = enumerable || new Enumerable();
	this._number = number;
}

SkipEnumerable.prototype = new Enumerable();

SkipEnumerable.prototype.getEnumerator = function() {
	return new SkipEnumerator(this._enumerable, this._number);
}


Enumerable.prototype.skip = function(number) {
	return new SkipEnumerable(this, number);
};