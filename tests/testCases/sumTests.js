module('Enumerable#sum');
test('Sum should throw an exception on empty sequences.', function () {
	var source = new List([]);

	throws(function () {
		var sum = source.sum();
	}, /Sequence contains no elements/, 'Throws error for empty sequence.');
});

test('Sum should calculate the sum of the items in a sequence', function() {
	var source = new List([4, 4, 5, 7, 8, 10, 18]);

	var sum = source.sum();

	strictEqual(sum, 56, 'Sum calculates the average of the items in a sequence.');
});

test('Sum should project the items of the sequence when a selector is provided.', function() {
	var source = new List([4, 4, 5, 7, 8, 10, 18]);

	var sum = source.sum(function(x) { return 2 * x });

	strictEqual(sum, 112, 'Sum calculates the sum of the projected items in a sequence.');
});