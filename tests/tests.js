module('Enumerable#selectMany');
test('flattening with projection and index', function () {
	var source = new List([3, 5, 20, 15]).selectMany(function (x, i) { return (x + i).toString().split(''); }, function (x, c) { return x + ': ' + c });
	deepEqual(source.toArray(), ["3: 3", "5: 6", "20: 2", "20: 2", "15: 1", "15: 8"], 'flattens the input sequence using elements index and projects the result')
});


module('Enumerable#any and Enumerable#all');
test('empty sequences with any and all', function () {
	var empty = Enumerable.empty();
	ok(empty.all(function (x) { return true; }), 'all returns true for empty sequences');
	ok(!empty.any(), 'any returns false for empty sequences');
});

test('parameterless any with non-empty sequence', function () {
	var notempty = Enumerable.repeat(1, 1);
	ok(notempty.any(), 'parameterless any returns true for non-empty sequences');
});

test('all-false sequence', function () {
	var allFalse = Enumerable.repeat(false, 5);
	ok(!allFalse.any(function (x) { return x; }), 'any will return false');
	ok(!allFalse.all(function (x) { return x; }), 'all will return false');
});

test('mixed sequence', function () {
	var mixed = new List([false, false, true, false]);
	ok(mixed.any(function (x) { return x; }), 'any will return true');
	ok(!mixed.all(function (x) { return x; }), 'all will return false');
});

test('all-true sequence', function () {
	var allTrue = Enumerable.repeat(true, 5);
	ok(allTrue.any(function (x) { return x; }), 'any will return true');
	ok(allTrue.all(function (x) { return x; }), 'all will return true');
});

test('iteration cancelling', function () {
	var lastThrowsError = new List([
		function () { return false; },
		function () { return true; },
		function () { throw new Error('should not be reached'); }
	]);

	ok(lastThrowsError.any(function (x) { return x(); }), 'any will cancel on first truthy element');
	ok(!lastThrowsError.all(function (x) { return x(); }), 'all will cancel on first falsy element');
});


module('Enumerable#first');
test('first on empty sequence', function () {
	var source = Enumerable.empty();

	throws(function () {
		source.first();
	}, /No item matched the predicate or sequence was empty/, 'throws error on empty sequence without predicate');

	throws(function () {
		source.first(function (x) { return true; });
	}, /No item matched the predicate or sequence was empty/, 'throws error on empty sequence with predicate');
});

test('first on single element sequence', function () {
	var source = Enumerable.range(1, 1);

	throws(function () {
		source.first(function (x) { return false; });
	}, /No item matched the predicate or sequence was empty/, 'throws error on sequence with no matching predicate');

	strictEqual(source.first(), 1, 'returns first element if no predicate specified');
	strictEqual(source.first(function (x) { return true; }), 1, 'returns first element if predicate matches');
});

test('first on multiple element sequence', function () {
	var source = Enumerable.range(1, 10);

	throws(function () {
		source.first(function () { return false; });
	}, /No item matched the predicate or sequence was empty/, 'throws error when no element matched predicate');

	strictEqual(source.first(), 1, 'returns first element when no predicate is specified');
	strictEqual(source.first(function (x) { return x === 6; }), 6, 'returns only matching element in sequence');
	strictEqual(source.first(function (x) { return x % 2 === 0; }), 2, 'returns first matching element in sequence');
});

test('iteration cancel if element found', function () {
	var enumerable = new List([
		function () { return false; },
		function () { return true; },
		function () { throw new Error('should not be reached'); }
	]);

	ok(enumerable.first(function (x) { return x(); })(), true, 'cancels iteration when matching element was found');
});

module('Enumerable#firstOrDefault');
test('firstOrDefault on empty sequence', function () {
	var source = Enumerable.empty();

	strictEqual(source.firstOrDefault(), null, 'returns default on empty sequence');
	strictEqual(source.firstOrDefault(function (x) { return true; }), null, 'returns default on empty sequence with predicate');
});

test('firstOrDefault on single element sequence', function () {
	var source = Enumerable.range(1, 1);

	strictEqual(source.firstOrDefault(function (x) { return false; }), null, 'returns default if no element matches predicate');
	strictEqual(source.firstOrDefault(), 1, 'returns first element if no predicate specified');
	strictEqual(source.firstOrDefault(function (x) { return true; }), 1, 'returns first element if predicate matches');
});

test('firstOrDefault on multiple element sequence', function () {
	var source = Enumerable.range(1, 10);

	strictEqual(source.firstOrDefault(function () { return false; }), null, 'returns default if no element matches predicate');
	strictEqual(source.firstOrDefault(), 1, 'returns first element when no predicate is specified');
	strictEqual(source.firstOrDefault(function (x) { return x === 6; }), 6, 'returns only matching element in sequence');
	strictEqual(source.firstOrDefault(function (x) { return x % 2 === 0; }), 2, 'returns first matching element in sequence');
});

test('iteration cancel if element found', function () {
	var enumerable = new List([
		function () { return false; },
		function () { return true; },
		function () { throw new Error('should not be reached'); }
	]);

	ok(enumerable.firstOrDefault(function (x) { return x(); })(), true, 'cancels iteration when matching element was found');
});

module('Enumerable#last');
test('last on empty sequence', function () {
	var source = Enumerable.empty();

	throws(function () {
		source.last();
	}, /No item matched the predicate or sequence was empty/, 'throws error on empty sequence without predicate');

	throws(function () {
		source.last(function (x) { return true; });
	}, /No item matched the predicate or sequence was empty/, 'throws error on empty sequence with predicate');
});

test('last on single element sequence', function () {
	var source = Enumerable.range(1, 1);

	throws(function () {
		source.last(function (x) { return false; });
	}, /No item matched the predicate or sequence was empty/, 'throws error on sequence with no matching predicate');

	strictEqual(source.last(), 1, 'returns last element if no predicate specified');
	strictEqual(source.last(function (x) { return true; }), 1, 'returns last element if predicate matches');
});

test('last on multiple element sequence', function () {
	var source = Enumerable.range(1, 10);

	throws(function () {
		source.last(function () { return false; });
	}, /No item matched the predicate or sequence was empty/, 'throws error when no element matched predicate');

	strictEqual(source.last(), 10, 'returns last element when no predicate is specified');
	strictEqual(source.last(function (x) { return x === 6; }), 6, 'returns only matching element in sequence');
	strictEqual(source.last(function (x) { return x % 2 === 0; }), 10, 'returns last matching element in sequence');
});


module('Enumerable#lastOrDefault');
test('lastOrDefault on empty sequence', function () {
	var source = Enumerable.empty();

	strictEqual(source.lastOrDefault(), null, 'returns default on empty sequence');
	strictEqual(source.lastOrDefault(function (x) { return true; }), null, 'returns default on empty sequence with predicate');
});

test('lastOrDefault on single element sequence', function () {
	var source = Enumerable.range(1, 1);

	strictEqual(source.lastOrDefault(function (x) { return false; }), null, 'returns default if no element matches predicate');
	strictEqual(source.lastOrDefault(), 1, 'returns last element if no predicate specified');
	strictEqual(source.lastOrDefault(function (x) { return true; }), 1, 'returns last element if predicate matches');
});

test('lastOrDefault on multiple element sequence', function () {
	var source = Enumerable.range(1, 10);

	strictEqual(source.lastOrDefault(function () { return false; }), null, 'returns default if no element matches predicate');
	strictEqual(source.lastOrDefault(), 10, 'returns last element when no predicate is specified');
	strictEqual(source.lastOrDefault(function (x) { return x === 6; }), 6, 'returns only matching element in sequence');
	strictEqual(source.lastOrDefault(function (x) { return x % 2 === 0; }), 10, 'returns last matching element in sequence');
});


module('Enumerable#single');
test('single on empty sequence', function () {
	var source = Enumerable.empty();

	throws(function () {
		source.single();
	}, /No item matched the predicate or sequence was empty/, 'throws error on empty sequence without predicate');

	throws(function () {
		source.single(function (x) { return true; });
	}, /No item matched the predicate or sequence was empty/, 'throws error on empty sequence with predicate');
});

test('single on single element sequence', function () {
	var source = Enumerable.range(1, 1);

	throws(function () {
		source.single(function (x) { return false; });
	}, /No item matched the predicate or sequence was empty/, 'throws error on sequence with no matching predicate');

	strictEqual(source.single(), 1, 'returns single element if no predicate specified');
	strictEqual(source.single(function (x) { return true; }), 1, 'returns single element if predicate matches');
});

test('single on multiple element sequence', function () {
	var source = Enumerable.range(1, 10);

	throws(function () {
		source.single(function () { return false; });
	}, /No item matched the predicate or sequence was empty/, 'throws error when no element matched predicate');
	throws(function () {
		source.single();
	}, /Multiple items in the sequence matched the predicate./, 'throws error when no predicate specified');
	throws(function () {
		source.single(function (x) { return x % 2 === 0; });
	}, /Multiple items in the sequence matched the predicate./, 'throws error when multiple elements matched the predicate');

	strictEqual(source.single(function (x) { return x === 6; }), 6, 'returns only matching element in sequence');
});

module('Enumerable#intersect');
test('Test intersect on lists of numbers.', function () {
	var first = new List([44, 26, 92, 30, 71, 38]);
	var second = new List([39, 59, 83, 47, 26, 4, 30]);
	deepEqual(first.intersect(second).toArray(),
		[26, 30], 'found correct intersections');
});


module('Enumerable#singleOrDefault');
test('singleOrDefault on empty sequence', function () {
	var source = Enumerable.empty();

	strictEqual(source.singleOrDefault(), null, 'returns default on empty sequence');
	strictEqual(source.singleOrDefault(function (x) { return true; }), null, 'returns default on empty sequence with predicate');
});

test('singleOrDefault on single element sequence', function () {
	var source = Enumerable.range(1, 1);

	strictEqual(source.singleOrDefault(function (x) { return false; }), null, 'returns default if no element matches predicate');
	strictEqual(source.singleOrDefault(), 1, 'returns single element if no predicate specified');
	strictEqual(source.singleOrDefault(function (x) { return true; }), 1, 'returns single element if predicate matches');
});

test('lastOrDefault on multiple element sequence', function () {
	var source = Enumerable.range(1, 10);

	throws(function () {
		source.singleOrDefault(function (x) { return x % 2 === 0; });
	}, /Multiple items in the sequence matched the predicate./, 'throws error when multiple elements matched the predicate');
	throws(function () {
		source.singleOrDefault();
	}, /Multiple items in the sequence matched the predicate./, 'throws error when no predicate was specified');

	strictEqual(source.singleOrDefault(function () { return false; }), null, 'returns default if no element matches predicate');
	strictEqual(source.singleOrDefault(function (x) { return x === 6; }), 6, 'returns only matching element in sequence');
});


module('Enumerable#defaultIfEmpty');
test('non empty input sequence', function () {
	var source = Enumerable.range(1, 25);
	deepEqual(source.defaultIfEmpty(10).toArray(), source.toArray(), 'will return original sequence if it was not empty');
	deepEqual(source.defaultIfEmpty().toArray(), source.toArray(), 'will return original sequence if it was not empty');
});

test('empty input sequence', function () {
	var source = Enumerable.empty();
	deepEqual(source.defaultIfEmpty(1).toArray(), [1], 'will return single element sequence with default value');
	deepEqual(source.defaultIfEmpty().toArray(), [undefined], 'will return single element sequence with default value');
});

module('Enumerable#aggregate');
test('testing method overloads (similar to msdn examples)', function () {
	var source = new List("the quick brown fox jumps over the lazy dog".split(' ')),
		reversed = source.aggregate(function (workingSentence, next) { return next + " " + workingSentence; });

	strictEqual(reversed, 'dog lazy the over jumps fox brown quick the', 'aggregation to reverse a sentence');

	source = new List([4, 8, 8, 3, 9, 0, 7, 8, 2]);
	strictEqual(source.aggregate(0, function (total, next) { return next % 2 == 0 ? total + 1 : total; }),
		6, 'aggregation to count even numbers with a seed');

	source = new List(["apple", "mango", "orange", "passionfruit", "grape"]);
	strictEqual(
		source.aggregate(
			'banana',
			function (longest, next) { return next.length > longest.length ? next : longest },
			function (result) { return result.toUpperCase(); }),
		'PASSIONFRUIT', 'aggregation to find longest string and uppercase it');
});

test('Seeded aggregate with result selector', function () {
	var source = new List([1, 4, 5]),
		seed = 5;

	strictEqual(source.aggregate(
		seed,
		function (current, value) { return current * 2 + value; },
		function (result) { return result.toString(); }), '57', 'seeded number aggregate projected to a string');
});


module('Enumerable#distinct');
test('msdn example pendants', function () {
	var ages = new List([21, 46, 46, 55, 17, 21, 55, 55]),
		distinctAges = ages.distinct();

	deepEqual(distinctAges.toArray(), [21, 46, 55, 17], 'distinct on numbers with default equality comparer');

	var customComparer = function (a, b) { return a === b || (!!a && !!b && a.code === b.code && a.name === b.name); },
		source = new List([
			{ name: "apple", code: 9 },
			{ name: "orange", code: 4 },
			{ name: "apple", code: 9 },
			{ name: "lemon", code: 12 }
		]);

	deepEqual(source.distinct(customComparer).toArray(),
		[{ name: "apple", code: 9 }, { name: "orange", code: 4 }, { name: "lemon", code: 12 }], 'distinct using custom comparer');
});

module('List#insert');
test('Simple insert test cases.', function () {
	var list = new List(['Mustang', 'Mustang GT', 'Shelby GT500']);

	list.insert(1, 'Camaro');
	deepEqual(list.toArray(), ['Mustang', 'Camaro', 'Mustang GT', 'Shelby GT500'], 'insertion of single element');

	list.insertRange(3, ['Challenger', 'Charger']);
	deepEqual(list.toArray(), ['Mustang', 'Camaro', 'Mustang GT', 'Challenger', 'Charger', 'Shelby GT500'], 'insertion of multiple element');
});

module('List#reverse');
test('Simple Reverse test cases.', function () {
	var list = new List(['Mustang', 'Camaro', 'Mustang GT', 'Challenger', 'Charger', 'Shelby GT500']);

	list.reverse();
	deepEqual(list.toArray(), ['Shelby GT500', 'Charger', 'Challenger', 'Mustang GT', 'Camaro', 'Mustang'], 'Reversion of complete list');

	list.reverse(2, 3);
	deepEqual(list.toArray(), ['Shelby GT500', 'Charger', 'Camaro', 'Mustang GT', 'Challenger', 'Mustang'], 'Reversion of range in list');
});

