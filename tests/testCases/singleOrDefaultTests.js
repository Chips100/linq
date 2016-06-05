module('Enumerable#singleOrDefault');
test('SingleOrDefault should return null when used on an empty sequence.', function () {
	var source = Enumerable.empty();

	strictEqual(source.singleOrDefault(), null, 'Returns null on an empty sequence.');
	strictEqual(source.singleOrDefault(function (x) { return true; }), null, 'Returns null on an empty sequence with a predicate provided.');
});

test('SingleOrDefault should return the only item in a sequence with one item if it matches the predicate.', function () {
	var source = Enumerable.range(1, 1);

	strictEqual(source.singleOrDefault(function (x) { return false; }), null, 'Returns null if no item matches the predicate.');
	strictEqual(source.singleOrDefault(), 1, 'Returns the item if no predicate is provided.');
	strictEqual(source.singleOrDefault(function (x) { return true; }), 1, 'Returns the item if it matches the predicate.');
});

test('SingleOrDefault should return the only matching item in a sequence with multiple items.', function () {
	var source = Enumerable.range(1, 10);

	throws(function () {
		source.singleOrDefault(function (x) { return x % 2 === 0; });
	}, /Multiple items in the sequence matched the predicate./, 'Throws an error when multiple items match the predicate.');
	throws(function () {
		source.singleOrDefault();
	}, /Multiple items in the sequence matched the predicate./, 'Throws an error when no predicate was specified for a sequence with more than one item.');

	strictEqual(source.singleOrDefault(function () { return false; }), null, 'Returns null if no item matches the predicate.');
	strictEqual(source.singleOrDefault(function (x) { return x === 6; }), 6, 'Returns the matching item if no other items in the sequence match the predicate.');
});