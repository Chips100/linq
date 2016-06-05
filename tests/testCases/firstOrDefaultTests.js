module('Enumerable#firstOrDefault');
test('FirstOrDefault should return null when used on an empty sequence.', function () {
	var source = Enumerable.empty();

	strictEqual(source.firstOrDefault(), null, 'Returns null on an empty sequence.');
	strictEqual(source.firstOrDefault(function (x) { return true; }), null, 'Returns null on an empty sequence with a predicate provided.');
});

test('FirstOrDefault should return the only item in a sequence with one item if it matches the predicate.', function () {
	var source = Enumerable.range(1, 1);

	strictEqual(source.firstOrDefault(function (x) { return false; }), null, 'Returns null if the item does not match the predicate.');
	strictEqual(source.firstOrDefault(), 1, 'Returns the item if no predicate is provided.');
	strictEqual(source.firstOrDefault(function (x) { return true; }), 1, 'Returns the item if it matches the specified predicate.');
});

test('FirstOrDefault should return the first matching item in a sequence with multiple items.', function () {
	var source = Enumerable.range(1, 10);

	strictEqual(source.firstOrDefault(function () { return false; }), null, 'Returns null if no item matches the predicate.');
	strictEqual(source.firstOrDefault(), 1, 'Returns the first item if no predicate is provided.');
	strictEqual(source.firstOrDefault(function (x) { return x === 6; }), 6, 'Returns the first item in the sequence matching the predicate.');
	strictEqual(source.firstOrDefault(function (x) { return x % 2 === 0; }), 2, 'Returns the first item in the sequence matching another predicate.');
});

test('FirstOrDefault should only iterate the sequence until a matching item is found.', function () {
	var enumerable = new List([
		function () { return false; },
		function () { return true; },
		function () { throw new Error('should not be reached'); }
	]);

	ok(enumerable.firstOrDefault(function (x) { return x(); })(), true, 'Cancels iteration when first matching item is found.');
});