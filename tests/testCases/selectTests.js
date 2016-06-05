module('Enumerable#select');
test('Select should project the sequence values using the selector.', function () {
	var source = new List([1, 5, 2]);
    var result = source.select(function (x) { return x.toString(); }).toArray();
    
	deepEqual(result, ['1', '5', '2'], 'Converts numbers to strings correctly.');
});

test('Select should produce potential side effects in the selector function in a predictable manner.', function () {
	var sourceArray = [],
		count = 0;

	sourceArray.length = 3;
	var query = new List(sourceArray).select(function (x) { return count++; });

	deepEqual(query.toArray(), [0, 1, 2], 'First iteration starting with 0.');
	deepEqual(query.toArray(), [3, 4, 5], 'Second iteration starting with 3.');
    
	count = 10;
	deepEqual(query.toArray(), [10, 11, 12], 'Third iteration starting with 10.');
});

test('Select should be chainable with Where.', function () {
	var source = new List([1, 3, 4, 2, 8, 1]);
    var result = source.where(function (x) { return x < 4; })
                    .select(function (x) { return 2 * x; })
                    .toArray()
    
	deepEqual(result, [2, 6, 4, 2], 'Filters to numbers smaller than 4 and doubles them.');
});

test('range and select combination', function () {
    var source = Enumerable.range(1, 10);
    var result = source.select(function (x) { return x * x; }).toArray();
    
	deepEqual(result, [1, 4, 9, 16, 25, 36, 49, 64, 81, 100], 'Creates a range from 1 to 10 and squares the results.')
});