module('Enumerable.repeat');
test('Repeat should create a sequence with a repeated value.', function () {
	var result = Enumerable.repeat('string', 3).toArray();
    deepEqual(result, ['string', 'string', 'string'], 'Creates a sequence with the string "string" three times.');
});

test('Repeat should allow creation of empty sequences.', function () {
    var result = Enumerable.repeat('string', 0).toArray();
	deepEqual(result, [], 'Creates an empty sequence.');
});

test('Repeat should be able to repeat null.', function () {
    var result = Enumerable.repeat(null, 2).toArray();
	deepEqual(result, [null, null], 'Creates a sequence with null repeated two times.');
});

test('Repeat should throw an error if a negative count is provided.', function () {
	throws(function () {
		Enumerable.repeat('string', -5);
	}, /Parameter value out of range/, 'Throws an error eagerly.');
});