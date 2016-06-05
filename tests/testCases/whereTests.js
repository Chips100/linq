module('Enumerable#where');
test('Where should filter sequence correctly.', function () {
	var ints = new List([1, 3, 4, 2, 8, 1]);
    
	deepEqual(ints.where(function (x) { return x < 4; }).toArray(),
		[1, 3, 2, 1], 'Filters to numbers smaller than 4.');
});

test('Where should filter sequence correctly.', function () {
	var fruits = new List(["apple", "passionfruit", "banana", "mango", "orange", "blueberry", "grape", "strawberry"]);
    var result = fruits.where(function (x) { return x.length < 6; }).toArray();
    
	deepEqual(result, ['apple', 'mango', 'grape'], 'Filters to strings shorter than 6 characters.');
});

test('Where should throw an Error eagerly if no predicate is provided.', function () {
	var ints = new List([1, 3, 4, 2, 8, 1]);

	throws(function () {
		ints = ints.where();
	}, /Invalid parameter: predicate/, 'Throws error for invalid predicate parameter eagerly.');
});

test('Where should only evaluate predicate when iterated.', function () {
	var ints = new List([1, 3, 4, 2, 8, 1]).where(function (x) { throw new Error('deferred'); });

	throws(function () {
		ints = ints.toArray();
	}, /deferred/, 'Throws error in predicate only when evaluated.');
});

test('Where should provide the index of the element to the predicate.', function () {
	var ints = new List([0, 30, 20, 15, 90, 85, 40, 75]);
    var result = ints.where(function (number, index) { return number <= index * 10; }).toArray();
    
	deepEqual(result, [0, 20, 15, 40], 'Filters to numbers smaller then the tenfold of their index in the sequence.');
});