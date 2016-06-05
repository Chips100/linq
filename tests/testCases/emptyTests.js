module('Enumerable.empty');
test('Empty should produce an empty sequence.', function () {
	var enumerator = Enumerable.empty().getEnumerator();
	ok(!enumerator.moveNext(), 'Enumerator should have no elements');
});

test('Empty should use a singleton for the empty sequence.', function () {
	strictEqual(Enumerable.empty(), Enumerable.empty(), 'Two empty enumerables share a single reference.');
});