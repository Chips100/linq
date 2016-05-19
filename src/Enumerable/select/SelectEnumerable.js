function SelectEnumerable(source, selector) {
	if (!source || !(source instanceof Enumerable)) {
		throw new Error('invalid source parameter: ' + source);
	}
	if (!selector || typeof(selector) !== 'function') {
		throw new Error('invalid selector parameter: ' + selector);
	}
	
	this._source = source || new Enumerable();
	this._selector = selector;
}

SelectEnumerable.prototype = new Enumerable();

SelectEnumerable.prototype.getEnumerator = function() {
	return new SelectEnumerator(this._source, this._selector);
}


Enumerable.prototype.select = function(selector) {
	return new SelectEnumerable(this, selector);
};