module('Enumerable#defaultIfEmpty');
test('DefaultIfEmpty should return the original sequence if it is not empty.', function () {
	var source = Enumerable.range(1, 25);
    
	deepEqual(source.defaultIfEmpty(10).toArray(), source.toArray(), 'Returns the original sequence if it is not empty.');
	deepEqual(source.defaultIfEmpty().toArray(), source.toArray(), 'Returns the original sequence if it is not empty and the default value was omitted.');
});

test('DefaultIfEmpty should return a sequence with the specified default value if the original sequence was empty.', function () {
	var source = Enumerable.empty();
	deepEqual(source.defaultIfEmpty(1).toArray(), [1], 'Returns a sequence with only the specified default value if the original sequence is empty.');
	deepEqual(source.defaultIfEmpty().toArray(), [undefined], 'Returns a sequence with only undefined if the original sequence is empty and the default value was omitted.');
});