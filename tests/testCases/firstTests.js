module('Enumerable#first');
test('First should throw an error when used on empty sequences.', function () {
	var source = Enumerable.empty();

	throws(function () {
		source.first();
	}, /No item matched the predicate or sequence was empty/, 'Throws an error on an empty sequence.');

	throws(function () {
		source.first(function (x) { return true; });
	}, /No item matched the predicate or sequence was empty/, 'Throws an error on an empty sequence when a predicate is provided.');
});

test('First should return the only item of a sequence with one item.', function () {
	var source = Enumerable.range(1, 1);

	throws(function () {
		source.first(function (x) { return false; });
	}, /No item matched the predicate or sequence was empty/, 'Throws an error if the item does not match the predicate.');

	strictEqual(source.first(), 1, 'Returns the item from the sequence when no predicate is provided.');
	strictEqual(source.first(function (x) { return true; }), 1, 'Returns the item from the sequence if it matches the predicate.');
});

test('First should return the first matching item of a sequence with multiple items.', function () {
	var source = Enumerable.range(1, 10);

	throws(function () {
		source.first(function () { return false; });
	}, /No item matched the predicate or sequence was empty/, 'Throws an error if no item matches the predicate.');

	strictEqual(source.first(), 1, 'Returns the first item if no predicate is provided.');
	strictEqual(source.first(function (x) { return x === 6; }), 6, 'Returns the first item matching the predicate.');
	strictEqual(source.first(function (x) { return x % 2 === 0; }), 2, 'Returns the first item matching another predicate.');
});

test('First should only iterate the sequence until the first matching item is found.', function () {
	var enumerable = new List([
		function () { return false; },
		function () { return true; },
		function () { throw new Error('should not be reached'); }
	]);

	ok(enumerable.first(function (x) { return x(); })(), 'Cancels iteration when first matching item was found.');
});