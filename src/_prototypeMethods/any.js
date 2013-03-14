Enumerable.prototype.any = function(predicate) {
	var enumerator = this.getEnumerator(),
		current;
	
	if (!predicate) {
		return enumerator.moveNext();
	}
	else {
		while(enumerator.moveNext()) {
			current = enumerator.getCurrent();
			if (predicate.call(current, current)) {
				return true;
			}
		}
		
		return false;
	}
};