module('List#elementAt');
test('ElementAt should throw an exception if provided a negative number.', function () {
	var source = new List([1, 2, 3]);

	throws(function () {
		var value = source.elementAt(-1);
	}, /Parameter value out of range/, 'Throws error for negative index.');
});

test('ElementAt should throw an exception if provided an index that exceeds the size of the sequence.', function () {
	var source = new List([1, 2, 3]);

	throws(function () {
		var value = source.elementAt(7);
	}, /Parameter value out of range/, 'Throws error for index that exceeds the size of the sequence.');
});

test('ElementAt should throw an exception if the source sequence is empty.', function () {
	var source = new List([]);

	throws(function () {
		var value = source.elementAt(0);
	}, /Parameter value out of range/, 'Throws error for index that exceeds the size of the sequence.');
});

test('ElementAt should return the item at the specified index.', function() {
	var source = new List([4, 4, 5, 7, 8, 10, 18]);

	strictEqual(4, source.elementAt(0), 'Returns the correct value for index 0.');
	strictEqual(4, source.elementAt(1), 'Returns the correct value for index 1.');
	strictEqual(5, source.elementAt(2), 'Returns the correct value for index 2.');
	strictEqual(7, source.elementAt(3), 'Returns the correct value for index 3.');
	strictEqual(18, source.elementAt(6), 'Returns the correct value for index 6.');
});