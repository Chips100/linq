// Enumerable base type
function Enumerable(arr) {
	this._array = arr || [];
}

//gets an enumerator by an initial array
Enumerable.prototype.getEnumerator = function() {
	throw new Error('Not implemented: Enumerable does not support getEnumerator.');
};