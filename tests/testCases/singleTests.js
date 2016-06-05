module('Enumerable#single');
test('Single should throw an error when used on empty sequences.', function () {
	var source = Enumerable.empty();

	throws(function () {
		source.single();
	}, /No item matched the predicate or sequence was empty/, 'Throws an error on an empty sequence.');

	throws(function () {
		source.single(function (x) { return true; });
	}, /No item matched the predicate or sequence was empty/, 'Throws an error on an empty sequence when a predicate is provided.');
});

test('Single should return the only item of a sequence with one item if it matches the predicate.', function () {
	var source = Enumerable.range(1, 1);

	throws(function () {
		source.single(function (x) { return false; });
	}, /No item matched the predicate or sequence was empty/, 'Throws an error if the item does not match the predicate.');

	strictEqual(source.single(), 1, 'Returns the item if no predicate is specified.');
	strictEqual(source.single(function (x) { return true; }), 1, 'Returns the item if it matches the predicate.');
});

test('Single should return the only matching item in a sequence with multiple items.', function () {
	var source = Enumerable.range(1, 10);

	throws(function () {
		source.single(function () { return false; });
	}, /No item matched the predicate or sequence was empty/, 'Throws an error when no item matches the predicate.');
	throws(function () {
		source.single();
	}, /Multiple items in the sequence matched the predicate./, 'Throws an error if no predicate is provided for a sequence with more than one item.');
	throws(function () {
		source.single(function (x) { return x % 2 === 0; });
	}, /Multiple items in the sequence matched the predicate./, 'Throws an error if multiple items match the predicate.');

	strictEqual(source.single(function (x) { return x === 6; }), 6, 'Returns the matching item if no other item matches the predicate.');
});