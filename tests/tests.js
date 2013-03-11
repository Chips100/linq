(function(global) {
	
	var tester = new Tester(),
		myEnum = new Enumerable([1,2,3,4,5,6,7,8,9,10]);

	tester.assert(1, 1, 'Always passing test');

	tester.assert(myEnum.toArray(), [1,2,3,4,5,6,7,8,9,10], 'Manipulation Free Enumeration.');
	tester.assert(myEnum.count(), 10, 'Simple counting');
	tester.assert(myEnum.skip(100).count(), 0, 'Chained counting');
	tester.assert(myEnum.take(3).count(), 3, 'Another Chained counting');

	tester.assert(myEnum.where(function(x) {
		return x > 7;
	}).toArray(), [8,9,10], 'Simple Where Enumeration.');

	tester.assert(myEnum.where(function(x) {
		return x > 7;
	}).where(function(x) {
		return x < 10;
	}).toArray(), [8,9], 'Chained Where Enumeration.');
	
	tester.assert(myEnum.where(function(x) {
		return +this > 6; }).toArray(), [7,8,9,10], 'Where Enumeration with dependency injection feature.');


	tester.assert(myEnum.take(3).toArray(), [1,2,3], 'Simple take enumeration');
	tester.assert(myEnum.take(5).toArray(), [1,2,3,4,5], 'Another simple take enumeration');
	
	tester.assert(myEnum.where(function(x) { return x > 4; }).take(2).toArray(), [5,6], 'Chained take enumeration');

	
	tester.assert(myEnum.skip(3).toArray(), [4,5,6,7,8,9,10], 'Simple skip enumeration');
	tester.assert(myEnum.skip(8).toArray(), [9,10], 'Another simple skip enumeration');
	
	tester.assert(myEnum.take(8).skip(1).take(20).skip(2).take(2).toArray(), [4,5], 'Complex chained skip enumeration');
	tester.assert(myEnum.skip(100).toArray(), [], 'Skip enumeration skipping more elements than array has.');


	tester.assert(myEnum.select(function(x) { return x+1; }).toArray(), [2,3,4,5,6,7,8,9,10,11], 'Simple Select enumeration');
	tester.assert(myEnum.skip(4).take(2).select(function(x) { return 2*x; }).toArray(), [10, 12], 'Chained Select enumeration');




	tester.assert(myEnum.skipWhile(function(x) {
		return x < 3;
	}).toArray(), [3,4,5,6,7,8,9,10], 'Simple skip while enumeration');
	tester.assert(myEnum.take(5).skipWhile(function(x) {
		return x < 3;
	}).toArray(), [3,4,5], 'Simple skip while enumeration');

	tester.run();


})(this);
