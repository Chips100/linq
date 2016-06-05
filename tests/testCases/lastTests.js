module('Enumerable#last');
test('Last should throw an error when used on empty sequences.', function () {
	var source = Enumerable.empty();

	throws(function () {
		source.last();
	}, /No item matched the predicate or sequence was empty/, 'Throws an error on an empty sequence.');

	throws(function () {
		source.last(function (x) { return true; });
	}, /No item matched the predicate or sequence was empty/, 'Throws an error on an empty sequence when a predicate is provided.');
});

test('Last should return the only item of a sequence with one item.', function () {
	var source = Enumerable.range(1, 1);

	throws(function () {
		source.last(function (x) { return false; });
	}, /No item matched the predicate or sequence was empty/, 'Throws an error if the item does not match the predicate.');

	strictEqual(source.last(), 1, 'Returns the item from the sequence when no predicate was provided.');
	strictEqual(source.last(function (x) { return true; }), 1, 'Returns the item from the sequence if it matches the predicate.');
});

test('Last should return the last matching item of a sequence with multiple items.', function () {
	var source = Enumerable.range(1, 10);

	throws(function () {
		source.last(function () { return false; });
	}, /No item matched the predicate or sequence was empty/, 'Throws an error if not item matches the predicate.');

	strictEqual(source.last(), 10, 'Returns the last item if no predicate is provided.');
	strictEqual(source.last(function (x) { return x === 6; }), 6, 'Returns the last item matching the predicate.');
	strictEqual(source.last(function (x) { return x % 2 === 0; }), 10, 'Returns the last item matching another predicate.');
});