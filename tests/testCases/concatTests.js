module('Eumerable#concat');
test('Concat should concatenate two sequences.', function () {
	var source = new List([1, 2, 3]);
    var result = source.concat(new List([3, 4, 5])).toArray();
    
	deepEqual(result, [1, 2, 3, 3, 4, 5], 'Concatenates two sequences.');
});

test('Concat should only evaluate the first source when iterated.', function () {
	var source = new ThrowingEnumerable().concat(new List([]));
	var enumerator = source.getEnumerator();

	throws(function () {
		enumerator.moveNext();
	}, /throwingenumerable/, 'Evaluates first sequence only when iterated.');
});

test('Concat should only evaluate second sequence when first sequence has been iterated over.', function () {
	var source = new List([1]).concat(new ThrowingEnumerable());
	var enumerator = source.getEnumerator();

    // Move past the first sequence with one item.
	enumerator.moveNext();

	throws(function () {
		enumerator.moveNext();
	}, /throwingenumerable/, 'Evaluates second sequence only when iteration has passed the first sequence.');
});