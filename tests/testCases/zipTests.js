module('Enumerable#zip');
test('Zip should throw an error if wrong arguments are supplied.', function () {
	var list = new List();

	throws(function () {
	    var result = list.zip();
	}, /Invalid parameter/, 'Throws an error if no second sequence is provided.');

	throws(function () {
        var result = list.zip(new List([1, 2, 3]));
	}, /Invalid parameter/, 'Throws an error if no result selector is provided.');
});

test('Zip should apply the result selector on corresponding elements from the two sequences.', function () {
	var first = new List([1, 2, 3, 4, 5, 6]),
        second = new List([10, 11, 12, 13, 14, 15]);

    var result = first.zip(second, function(a, b) { return a + b; });

    deepEqual([11, 13, 15, 17, 19, 21], result.toArray(), 'Applies result selector on corresponding elements.');
});

test('Zip should abort the enumeration if the end of one of the sequences is reached.', function () {
	var first = new List([1, 2, 3, 4, 5, 6]),
        second = new List([10, 11, 12, 13]);

    var firstResult = first.zip(second, function(a, b) { return a + b; });
    var secondResult = second.zip(first, function(a, b) { return a + b; });

    deepEqual([11, 13, 15, 17], firstResult.toArray(), 'Aborts if the end of the second sequence is reached.');
    deepEqual([11, 13, 15, 17], secondResult.toArray(), 'Aborts if the end of the first sequence is reached.');
});