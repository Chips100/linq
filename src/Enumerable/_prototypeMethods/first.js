Enumerable.prototype.first = function(predicate) {
	var enumerator = this.getEnumerator(),
		current;
		
	while(enumerator.moveNext()) {
		current = enumerator.getCurrent();
		
		if (!predicate || predicate.call(current, current)) {
			return current;
		}
	}
	
	throw new Error('no items matched the predicate or sequence was empty');
}