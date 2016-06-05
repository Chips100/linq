module('Enumerable#aggregate');
test('Aggregate should support different overloads, e.g. omitting the seed value.', function () {
	var source = new List("the quick brown fox jumps over the lazy dog".split(' ')),
		result = source.aggregate(function (workingSentence, next) { return next + " " + workingSentence; });

	strictEqual(result, 'dog lazy the over jumps fox brown quick the', 'Aggregate uses the first value from the sequence if no explicit seed was provided.');


	source = new List([4, 8, 8, 3, 9, 0, 7, 8, 2]);
    result = source.aggregate(0, function (total, next) { return next % 2 == 0 ? total + 1 : total; });
	strictEqual(result, 6, 'Aggregation uses the explicitly specified seed if provided.');


	source = new List(["apple", "mango", "orange", "passionfruit", "grape"]);
    result = source.aggregate(
			'banana',
			function (longest, next) { return next.length > longest.length ? next : longest },
			function (result) { return result.toUpperCase(); });
            
	strictEqual(result, 'PASSIONFRUIT', 'Aggregate applies the projection defined by the resultSelector on the result if provided.');
});