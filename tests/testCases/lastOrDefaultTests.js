module('Enumerable#lastOrDefault');
test('LastOrDefault should return the null when used on an empty sequence.', function () {
	var source = Enumerable.empty();

	strictEqual(source.lastOrDefault(), null, 'Returns null on an empty sequence.');
	strictEqual(source.lastOrDefault(function (x) { return true; }), null, 'Returns null on an empty sequence with a predicate provided.');
});

test('LastOrDefault should return the only item in a sequence with one item if it matches the predicate.', function () {
	var source = Enumerable.range(1, 1);

	strictEqual(source.lastOrDefault(function (x) { return false; }), null, 'Returns null if the item does not match the predicate.');
	strictEqual(source.lastOrDefault(), 1, 'Returns the item if no predicate is provided.');
	strictEqual(source.lastOrDefault(function (x) { return true; }), 1, 'Returns the item if it matches the specified predicate.');
});

test('LastOrDefault should return the last matching item in a sequence with multiple items.', function () {
	var source = Enumerable.range(1, 10);

	strictEqual(source.lastOrDefault(function () { return false; }), null, 'Returns null if no item matches the predicate.');
	strictEqual(source.lastOrDefault(), 10, 'Returns the last item if no predicate is provided.');
	strictEqual(source.lastOrDefault(function (x) { return x === 6; }), 6, 'Returns the last item in the sequence matching the predicate.');
	strictEqual(source.lastOrDefault(function (x) { return x % 2 === 0; }), 10, 'Returns the last item in the sequence matching another predicate.');
});