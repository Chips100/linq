Enumerable.prototype.firstOrDefault = function(predicate) {
	var enumerator = this.getEnumerator(),
		current;
		
	while(enumerator.moveNext()) {
		current = enumerator.getCurrent();
		
		if (!predicate || predicate.call(current, current)) {
			return current;
		}
	}
	
	return null;
}