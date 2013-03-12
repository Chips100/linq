// runs a series of tests for enumeration operations
(function(global) {
	
	var tester = new Tester(),
		enumerable,
		sentence,
		comparer,
		fruits = ['apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape'];


	/* Tests for Aggregate Method */
	sentence = 'the quick brown fox jumps over the lazy dog';
	enumerable = new Enumerable(sentence.split(' '));
	tester.assert(enumerable.aggregate(function(workingSentence, next) { return next + ' ' + workingSentence; }),
		'dog lazy the over jumps fox brown quick the', 'Simple Aggregation Method Test.');
	
	enumerable = new Enumerable([4,8,8,3,9,0,7,8,2]);
	tester.assert(enumerable.aggregate(0, function(total, next) {
		return next % 2 === 0 ? total + 1 : total;
	}), 6, 'Aggregation Method test with seed.')
	
	enumerable = new Enumerable(['apple', 'mango', 'orange', 'passionfruit', 'grape']);
	tester.assert(enumerable
		.aggregate('banana', function(longest, next) { 
			return next.length > longest.length ? next : longest; 
		}, function(fruit) { 
			return fruit.toUpperCase(); 
		}), 'PASSIONFRUIT', 'Aggregate Method Test');
		
 
	
	/* Tests for All Method */
	enumerable = new Enumerable([{ name: 'Barley', age: 10}, { name: 'Boots', age: 4}, { name: 'Whiskers', age: 6}]);
	tester.assert(enumerable.all(function(pet) { return pet.name.indexOf('B') === 0; }), false, 'All Method Test.');
	tester.assert(enumerable.all(function(pet) { return pet.age < 20; }), true, 'All Method Test.')


	/* Tests for Contains Method */
	enumerable = new Enumerable(fruits);
	tester.assert(enumerable.contains('mango'), true, 'Contains Method test.');
	
	comparer = function(a,b) { return a.code === b.code && a.name === b.name;  };
	enumerable = new Enumerable([{name: 'apple', code:9}, {name:'orange', code:4}, {name:'lemon', code:12}]);
	tester.assert(enumerable.contains({name:'apple', code:9}, comparer), true, 'Contains Method test using custom comparer.');
	tester.assert(enumerable.contains({name:'kiwi', code:8}, comparer), false, 'Contains Method test using custom comparer.');
	tester.assert(enumerable.contains({name:'apple', code:9}), false, 'Contains Method test not using custom comparer.');



	/* Tests for Count Method */
	enumerable = new Enumerable(fruits);
	tester.assert(enumerable.count(), 6, 'Count method test.')
	
	enumerable = new Enumerable([{name: 'Barley', vaccinated:true}, {name: 'Boots', vaccinated:false}, {name: 'Whiskers', vaccinated:false}]);
	tester.assert(enumerable.count(function(p) { return !p.vaccinated }), 2, 'Count method using a predicate.');


	/* Tests for static Repeat Method */
	enumerable = Enumerable.repeat('I like programming.', 5);
	tester.assert(enumerable.toArray(), ['I like programming.','I like programming.','I like programming.','I like programming.','I like programming.'],
		'Repeat method test.')



	/* Tests for Select Method */
	enumerable = new Enumerable([1,2,3,4,5,6,7,8,9,10])
		.select(function(x) { return x*x; });
							
	tester.assert(enumerable.toArray(), [1,4,9,16,25,36,49,64,81,100], 'Select method calculating squares.')
	
	enumerable = new Enumerable(fruits)
		.select(function(x, i) { return x.substring(0, i); });
					
	tester.assert(enumerable.toArray(), ['', 'b', 'ma', 'ora', 'pass', 'grape'], 'Select method using index of element.')



	/* Tests for SelectMany Method */
	enumerable = new Enumerable([
		{ name: 'Higa, Sidney', pets: ['Scruffy', 'Sam'] },
		{ name: 'Ashkenazi, Ronen', pets: new Enumerable(['Walker', 'Sugar'])}, //hier können arrays oder enumerables stehen.
		{ name: 'Price, Vernette', pets: ['Scratches', 'Diesel'] }
	]).selectMany(function(petOwner) { return petOwner.pets; });
	tester.assert(enumerable.toArray(), ['Scruffy', 'Sam', 'Walker', 'Sugar', 'Scratches', 'Diesel'], 'SelectMany method test.');
	
	enumerable = new Enumerable([
		{ name: 'Higa, Sidney', pets: ['Scruffy', 'Sam'] },
		{ name: 'Ashkenazi, Ronen', pets: ['Walker', 'Sugar']},
		{ name: 'Price, Vernette', pets: ['Scratches', 'Diesel'] },
		{ name: 'Hines, Patrick', pets:['Dusty']}
	]).selectMany(function(petOwner, index) {
		for (var i = petOwner.pets.length - 1; i >= 0; i--) {
			petOwner.pets[i] = index + petOwner.pets[i];
		}
		return petOwner.pets;
	});
	tester.assert(enumerable.toArray(), ['0Scruffy', '0Sam', '1Walker', '1Sugar', '2Scratches', '2Diesel', '3Dusty'], 'SelectMany method test using elements index.')

	enumerable = new Enumerable([
		{ name: 'Higa, Sidney', pets: ['Scruffy', 'Sam'] },
		{ name: 'Ashkenazi, Ronen', pets: ['Walker', 'Sugar']},
		{ name: 'Price, Vernette', pets: ['Scratches', 'Diesel'] },
		{ name: 'Hines, Patrick', pets:['Dusty']}
	]).selectMany(function(petOwner) { return petOwner.pets }, function(pet, petOwner) { return petOwner.pets.length + pet });
	tester.assert(enumerable.toArray(), ['2Scruffy', '2Sam', '2Walker', '2Sugar', '2Scratches', '2Diesel', '1Dusty'], 'SelectMany method test with resultSelector.')



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
