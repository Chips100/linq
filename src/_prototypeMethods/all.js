Enumerable.prototype.all = function(predicate) {
	if (!predicate || typeof(predicate) !== 'function') {
		throw new Error('invalid predicate parameter: ' + predicate);	
	}
	
	var enumerator = this.getEnumerator(),
		current;
	
	while(enumerator.moveNext()) {
		current = enumerator.getCurrent();
		if (!predicate.call(current, current)) {
			return false;
		}
	}
	
	return true;
};