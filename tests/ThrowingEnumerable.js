function ThrowingEnumerable() {
	
}
ThrowingEnumerable.prototype = new Enumerable();
ThrowingEnumerable.prototype.getEnumerator = function() {
	return new ThrowingEnumerator();
};



function ThrowingEnumerator() {

}
ThrowingEnumerator.prototype.getCurrent = function() {
	throw new Error('throwingenumerable');
};
ThrowingEnumerator.prototype.moveNext = function() {
	throw new Error('throwingenumerable');
};
ThrowingEnumerator.prototype.reset = function() {
};
