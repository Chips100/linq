Enumerable.prototype.contains = function(value, comparer) {
	var enumerator = this.getEnumerator(),
		current;
	
	while(enumerator.moveNext()) {
		current = enumerator.getCurrent();
		if ((comparer && comparer.call(current, current, value)) || current === value) {
			return true;	
		}
	}
	
	return false;
};