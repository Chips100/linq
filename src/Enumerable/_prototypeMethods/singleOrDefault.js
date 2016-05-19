Enumerable.prototype.singleOrDefault = function(predicate) {
	var enumerator = this.getEnumerator(),
		current,
		returnValueSet = false,
		returnValue;
		
	while(enumerator.moveNext()) {
		current = enumerator.getCurrent();
		if (!predicate || predicate.call(current, current)) {
			if(!returnValueSet) {
				returnValueSet = true;
				returnValue = current;
			}
			else {
				throw new Error('sequence contained multiple matching elements');
			}
		}
	}
	
	if (!returnValueSet) {
		return null;
	}
	else {
		return returnValue;
	}
};