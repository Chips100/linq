// Enumerable base class
function Enumerable(arr) {
	this._array = arr || [];
}


//gets an enumerator by an initial array
Enumerable.prototype.getEnumerator = function() {
	return new Enumerator(this._array);
};



// transforms this enumerable back into an array.
Enumerable.prototype.toArray = function() {
	var result = [],
		enumerator = this.getEnumerator();
		
	while(enumerator.moveNext()) {
		result.push(enumerator.getCurrent());
	}
	
	return result;
};