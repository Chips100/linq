Enumerable.empty = function() {
	if (!Enumerable.empty._singleTon) {
		Enumerable.empty._singleTon = new EmptyEnumerable();
	}
	
	return Enumerable.empty._singleTon;
};

function EmptyEnumerable() {
}
EmptyEnumerable.prototype = new Enumerable();
EmptyEnumerable.prototype.getEnumerator = function() { return new EmptyEnumerator(); };

function EmptyEnumerator() {
}
EmptyEnumerator.prototype.getCurrent = function() {};
EmptyEnumerator.prototype.reset = function() {};
EmptyEnumerator.prototype.moveNext = function() { return false; }