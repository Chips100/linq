module('Enumerable.range');
test('Range should allow creation of ranges with a negative start.', function () {
	var result = Enumerable.range(-3, 5).toArray();
	deepEqual(result, [-3, -2, -1, 0, 1], 'Creates a range from -3 to 1.');
});

test('Range should throw an error if a negative count is provided.', function () {
	throws(function () {
		Enumerable.range(0, -4);
	}, /Parameter value out of range/, 'Throws an error eagerly.');
})

test('Range should allow creation of an empty sequence.', function () {
	var result = Enumerable.range(Infinity, 0).toArray();
	deepEqual(result, [], 'Creates an empty range.');
});