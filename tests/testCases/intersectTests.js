module('Enumerable#intersect');
test('Intersect should return a sequence with items that appear in both source sequences.', function () {
	var first = new List([44, 26, 92, 30, 71, 38]);
	var second = new List([39, 59, 83, 47, 26, 4, 30]);
    
    var result = first.intersect(second).toArray();
	deepEqual(result, [26, 30], 'Returns a sequence with the intersections from the source sequences.');
});