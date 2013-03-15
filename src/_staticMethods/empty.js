Enumerable.empty = function() {
	if (!Enumerable.empty._singleTon) {
		Enumerable.empty._singleTon = new Enumerable([]);
	}
	
	return Enumerable.empty._singleTon;
};