module('Enumerable#average');
test('Average should throw an exception on empty sequences.', function () {
	var source = new List([]);

	throws(function () {
		var avg = source.average();
	}, /Sequence contains no elements/, 'Throws error for empty sequence.');
});

test('Average should calculate the average of the items in a sequence', function() {
	var source = new List([4, 4, 5, 7, 8, 10, 18]);

	var avg = source.average();

	strictEqual(avg, 8, 'Average calculates the average of the items in a sequence.');
});

test('Average should project the items of the sequence when a selector is provided.', function() {
	var source = new List([4, 4, 5, 7, 8, 10, 18]);

	var avg = source.average(function(x) { return 2 * x });

	strictEqual(avg, 16, 'Averages calculates the average of the projected items in a sequence.');
});