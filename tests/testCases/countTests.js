module('Enumerable#count');
test('Count should return 0 for empty sequences.', function () {
	equal(Enumerable.empty().count(), 0, 'Returns 0 for an empty sequence.');
});

test('Count should return the number of elements in a sequence.', function () {
    var source = Enumerable.repeat(null, 5);
    var result = source.count();
    
	equal(result, 5, 'Returns 5 for a sequence with five elements.');
});

test('Count should accept a predicate to count only elements matching the predicate.', function () {
	var source = new List([{ Name: "Barley", Vaccinated: true }, { Name: "Boots", Vaccinated: false }, { Name: "Whiskers", Vaccinated: false }]);
    var result = source.count(function (x) { return !x.Vaccinated; });
	equal(result, 2, 'Returns 2 for a sequence with more elements of which two match the predicate.');
});