module('List#elementAtOrDefault');
test('ElementAtOrDefault should return a default value if provided a negative number.', function () {
	var source = new List([1, 2, 3]).asEnumerable();
	var value = source.elementAtOrDefault(-1);

	strictEqual(null, value, 'Returns a default value if provided a negative number.')	
});

test('ElementAtOrDefault should return a default value if provided an index that exceeds the size of the sequence.', function () {
	var source = new List([1, 2, 3]).asEnumerable();
	var value = source.elementAtOrDefault(7);

	strictEqual(null, value, 'Returns a default value for index that exceeds the size of the sequence.');
});

test('ElementAtOrDefault should return a default value if the source sequence is empty.', function () {
	var source = new List([]).asEnumerable();
	var value = source.elementAtOrDefault(0);
	
	strictEqual(null, value, 'Returns a default value if the source sequence is empty.');
});

test('ElementAtOrDefault should return the item at the specified index.', function() {
	var source = new List([4, 4, 5, 7, 8, 10, 18]).asEnumerable();

	strictEqual(4, source.elementAtOrDefault(0), 'Returns the correct value for index 0.');
	strictEqual(4, source.elementAtOrDefault(1), 'Returns the correct value for index 1.');
	strictEqual(5, source.elementAtOrDefault(2), 'Returns the correct value for index 2.');
	strictEqual(7, source.elementAtOrDefault(3), 'Returns the correct value for index 3.');
	strictEqual(18, source.elementAtOrDefault(6), 'Returns the correct value for index 6.');
});