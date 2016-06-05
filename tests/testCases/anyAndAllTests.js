module('Enumerable#any and Enumerable#all');
test('Empty sequence should result in true for all and in false for any.', function () {
	var empty = Enumerable.empty();
    
	ok(empty.all(function (x) { return true; }), 'All returns true for empty sequences.');
	ok(!empty.any(), 'Any returns false for empty sequences.');
});

test('Any should support omitting the predicate.', function () {
	var notempty = Enumerable.repeat(1, 1);
    
	ok(notempty.any(), 'Any returns true for non-empty sequences when the predicate is omitted.');
});

test('Any and all should handle sequences with no matching items correctly.', function () {
	var allFalse = Enumerable.repeat(false, 5);
    
	ok(!allFalse.any(function (x) { return x; }), 'Any returns false for a sequence with no matching items.');
	ok(!allFalse.all(function (x) { return x; }), 'All returns false for a sequence with no matching items.');
});

test('Any and all should handle sequences with some matching items correctly.', function () {
	var mixed = new List([false, false, true, false]);
    
	ok(mixed.any(function (x) { return x; }), 'Any returns true for a sequence with some matching items.');
	ok(!mixed.all(function (x) { return x; }), 'All returns false for a sequence with some matching items.');
});

test('Any and all should handle sequences with only matching items correctly.', function () {
	var allTrue = Enumerable.repeat(true, 5);
    
	ok(allTrue.any(function (x) { return x; }), 'Any returns true for a sequence with only matching items.');
	ok(allTrue.all(function (x) { return x; }), 'All returns true for a sequence with only matching items.');
});

test('Any and all should only iterate the sequence as far as necessary.', function () {
	var lastThrowsError = new List([
		function () { return false; },
		function () { return true; },
		function () { throw new Error('should not be reached'); }
	]);

	ok(lastThrowsError.any(function (x) { return x(); }), 'Any cancels iteration when first matching item is found.');
	ok(!lastThrowsError.all(function (x) { return x(); }), 'All cancels iteration when first non-matching item is found.');
});