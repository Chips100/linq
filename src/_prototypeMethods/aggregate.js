Enumerable.prototype.aggregate = function(seed, func, resultSelector) {
	var enumerator = this.getEnumerator(),
		current,
		aggregation;
	
	//check if seed parameter was actually omitted
	if (typeof(seed) === 'function') {
		if (typeof(func) === 'function') {
			resultSelector = func;
		}
		
		func = seed;
		
		enumerator.moveNext();
		seed = enumerator.getCurrent();
	}
	
	aggregation = seed;
	while(enumerator.moveNext()) {
		current = enumerator.getCurrent();
		aggregation = func.call(current, aggregation, current);
	}
	
	if (!resultSelector) {
		return aggregation;
	}
	else {
		return resultSelector.call(aggregation, aggregation);
	}
};