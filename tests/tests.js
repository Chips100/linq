// runs a series of tests for enumeration operations
(function(global) {
	
	var tester = new Tester(),
		enumerable,
		fruits = ['apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape'];


	/* Tests for Count Method */
	enumerable = new Enumerable(fruits);
	tester.assert(enumerable.count(), 6, 'Count method test.')
	
	enumerable = new Enumerable([{name: 'Barley', vaccinated:true}, {name: 'Boots', vaccinated:false}, {name: 'Whiskers', vaccinated:false}]);
	tester.assert(enumerable.count(function(p) { return !p.vaccinated }), 2, 'Count method using a predicate.');



	/* Tests for Select Method */
	enumerable = new Enumerable([1,2,3,4,5,6,7,8,9,10])
		.select(function(x) { return x*x; });
							
	tester.assert(enumerable.toArray(), [1,4,9,16,25,36,49,64,81,100], 'Select method calculating squares.')
	
	enumerable = new Enumerable(fruits)
		.select(function(x, i) { return x.substring(0, i); });
					
	tester.assert(enumerable.toArray(), ['', 'b', 'ma', 'ora', 'pass', 'grape'], 'Select method using index of element.')



	/* Tests for Skip Method */
	enumerable = new Enumerable([98, 92, 85, 82, 70, 59, 56]).skip(3);
	tester.assert(enumerable.toArray(), [82, 70, 59, 56], 'Skip method test.')



	/* Tests for SkipWhile Method */
	enumerable = new Enumerable([98, 92, 85, 82, 70, 59, 56])
		.skipWhile(function(x) { return x >= 80; });
	
	tester.assert(enumerable.toArray(), [70, 59, 56], 'SkipWhile method test.')
	
	enumerable = new Enumerable([5000, 2500, 9000, 8000, 6500, 4000, 1500, 5500])
		.skipWhile(function(x, i) { return x > i * 1000; });
	
	tester.assert(enumerable.toArray(), [4000, 1500, 5500], 'SkipWhile method using index of element.')



	/* Tests for Take Method */
	enumerable = new Enumerable([98, 92, 85, 82, 70, 59, 56]).take(3);
	tester.assert(enumerable.toArray(), [98, 92, 85], 'Take method test.');
	
	
	
	/* Tests for TakeWhile Method */
	enumerable = new Enumerable(fruits).takeWhile(function(x) { return x !== 'orange'; });
	tester.assert(enumerable.toArray(), ['apple', 'banana', 'mango'], 'TakeWhile method test.')

	enumerable = new Enumerable(['apple', 'passionfruit', 'banana', 'mango', 'orange', 'blueberry', 'grape', 'strawberry'])
		.takeWhile(function(x, i) { return x.length >= i; });
		
	tester.assert(enumerable.toArray(), ['apple', 'passionfruit', 'banana', 'mango', 'orange', 'blueberry'], 'TakeWhile method using index of element.')



	/* Tests for Where Method */
	enumerable = new Enumerable(['apple', 'passionfruit', 'banana', 'mango', 'orange', 'blueberry', 'grape', 'strawberry'])
		.where(function(x) { return x.length < 6; });
		
	tester.assert(enumerable.toArray(), ['apple', 'mango', 'grape'], 'Where method test.');
	
	enumerable = new Enumerable([0, 30, 20, 15, 90, 85, 40, 75])
		.where(function(number, index) { return number <= index * 10; });
		
	tester.assert(enumerable.toArray(), [0, 20, 15, 40], 'Where method using index of element.')





	// run the tests
	tester.run();
})(this);
