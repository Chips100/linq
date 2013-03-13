function ConcatEnumerable(first, second) {
	if (!first || !(first instanceof Enumerable)) {
		throw new Error('invalid first parameter: ' + first)
	}
	if (!second || !(second instanceof Enumerable)) {
		throw new Error('invalid second parameter: ' + second);
	}
	
	this._first = first;
	this._second = second;
}

ConcatEnumerable.prototype = new Enumerable();

ConcatEnumerable.prototype.getEnumerator = function() {
	return new ConcatEnumerator(this._first, this._second);
};
