module('Enumerable#where');
test('simple filtering', function() {
	var ints = new Enumerable([1, 3, 4, 2, 8, 1]);
	deepEqual(ints.where(function(x) { return x < 4; }).toArray(),
		[1, 3, 2, 1], 'filter numbers smaller than 4');
});

test('where predicate null exception', function() {
	var ints = new Enumerable([1, 3, 4, 2, 8, 1]);
	
	throws(function() {
		ints = ints.where();
	}, /invalid predicate parameter/, 'throws error for invalid parameter eagerly');
});

test('where deferred execution', function() {
	var ints = new Enumerable([1, 3, 4, 2, 8, 1]);
	ints = ints.where(function(x) { throw new Error('deferred'); });
	
	throws(function() {
		ints = ints.toArray();
	}, /deferred/, 'throws error only when evaluated');
});

test('another simple filtering', function() {
	var fruits = new Enumerable(["apple", "passionfruit", "banana", "mango", "orange", "blueberry", "grape", "strawberry"]);
	deepEqual(fruits.where(function(x) { return x.length < 6; }).toArray(),
		['apple', 'mango', 'grape'], 'filters strings with a length below 6');
});

test('filtering using elements index', function() {
	var ints = new Enumerable([0, 30, 20, 15, 90, 85, 40, 75 ]);
	deepEqual(ints.where(function(number, index) { return number <= index * 10; }).toArray(),
		[0, 20, 15, 40], 'filters numbers smaller then the tenfold of their index in sequence');
});



module('Enumerable#select');
test('simple projection to different type', function() {
	var source = new Enumerable([1, 5, 2 ]);
	deepEqual(source.select(function(x) { return x.toString(); }).toArray(),
		['1', '5', '2'], 'converts numbers to strings');
});

test('Side effects in projection', function() {
	var sourceArray = [],
		count = 0;
		
	sourceArray.length = 3;
	var query = new Enumerable(sourceArray).select(function(x) { return count++; });
	
	deepEqual(query.toArray(), [0, 1, 2], 'first iteration starting with 0');
	deepEqual(query.toArray(), [3, 4, 5], 'second iteration starting with 3');
	count = 10;
	
	deepEqual(query.toArray(), [10, 11, 12], 'third iteration starting with 10');
});

test('where and select combination', function() {
	var source = new Enumerable([1, 3, 4, 2, 8, 1]);
	deepEqual(source.where(function(x) { return x < 4; }).select(function(x) { return 2*x; }).toArray(),
		[2, 6, 4, 2], 'filters numbers smaller than 4 and doubles them');
});

test('range and select combination', function() {
	deepEqual(Enumerable.range(1, 10).select(function(x) {return x*x;}).toArray(),
		[1, 4, 9, 16, 25, 36, 49, 64, 81, 100], 'creates a range from 1 to 10 and squares the results')
});

module('Enumerable.range');
test('range creation with negative start', function() {
	deepEqual(Enumerable.range(-3, 5).toArray(),
		[-3, -2, -1, 0, 1], 'creates a range from -3 to 1');
});

test('range creation with negative count (should fail)', function() {
	throws(function() {
		Enumerable.range(0, -4);
	}, /invalid count parameter/, 'throws error eagerly');
})

test('range creation with zero length', function() {
	deepEqual(Enumerable.range(Infinity, 0).toArray(),
		[], 'creates an empty range');
});


module('Enumerable.empty');
test('check if sequence is empty', function() {
	var enumerator = Enumerable.empty().getEnumerator();
	ok(!enumerator.moveNext(), 'Enumerator should have no elements');
});
test('check empty is a singleton', function() {
	strictEqual(Enumerable.empty(), Enumerable.empty());
});


module('Enumerable.repeat');
test('simple string repitition', function() {
	deepEqual(Enumerable.repeat('string', 3).toArray(),
		['string', 'string', 'string'], 'repeats "string" three times');
});
test('empty repitition', function() {
	deepEqual(Enumerable.repeat('string', 0).toArray(),
		[], 'repeats string zero times');
});
test('null repetition', function() {
	deepEqual(Enumerable.repeat(null, 2).toArray(),
		[null, null], 'repeats null elements two times');
});
test('repitition with negative count (should fail)', function() {
	throws(function() {
		Enumerable.repeat('string', -5);
	}, /invalid count parameter/, 'throws error eagerly');
});

module('Enumerable#count');
test('simple count of empty', function() {
	equal(Enumerable.empty().count(), 0, 'empty has a count of zero');
});
test('simple count of repitition', function() {
	equal(Enumerable.repeat(null, 5).count(), 5, 'repitition with five elements has a count of five');
});
test('count with a predicate', function() {
	var source = new Enumerable([{ Name:"Barley", Vaccinated:true }, { Name:"Boots", Vaccinated:false }, { Name:"Whiskers", Vaccinated:false }]);
	equal(source.count(function(x) { return !x.Vaccinated; }), 2, 'sequence contains 2 unvaccinated animals');
});

module('Eumerable#concat');
test('simple concatenation', function() {
	var source = new Enumerable([1, 2, 3]).concat(new Enumerable([3, 4, 5]));
	deepEqual(source.toArray(), [1, 2, 3, 3, 4, 5], 'concatination of two number sequences');
});
test('time of first access of first sequence', function() {
	var source = new ThrowingEnumerable().concat(new Enumerable([]));
	var enumerator = source.getEnumerator();
	
	throws(function() {
		enumerator.moveNext();
	}, /throwingenumerable/, 'throws only on first access');
});
test('time of first access of second sequence', function() {
	var source = new Enumerable([1]).concat(new ThrowingEnumerable());
	var enumerator = source.getEnumerator();
	
	ok(enumerator.moveNext());
	strictEqual(enumerator.getCurrent(), 1);
	
	throws(function() {
		enumerator.moveNext();
	}, /throwingenumerable/, 'throws only on first access');
});

module('Enumerable#selectMany');
test('flattening with projection and index', function() {
	var source = new Enumerable([3, 5, 20, 15]).selectMany(function(x, i) { return (x+i).toString().split(''); }, function(x, c) { return x +': '+ c });
	deepEqual(source.toArray(), ["3: 3", "5: 6", "20: 2", "20: 2", "15: 1", "15: 8"], 'flattens the input sequence using elements index and projects the result')
});
