Enumerable.prototype.count = function(predicate) {
	var counter = 0,
		current,
		enumerator = this.getEnumerator();
		
	while(enumerator.moveNext()) {
		if (!predicate || predicate.call(current = enumerator.getCurrent(), current)) {
			counter++;
		}
	}
	
	return counter;
};