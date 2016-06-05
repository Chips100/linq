module('Enumerable#distinct');
test('Distinct should support specifying a custom equality comparer or use the default one.', function () {
	var source = new List([21, 46, 46, 55, 17, 21, 55, 55]),
		result = source.distinct().toArray();

	deepEqual(result, [21, 46, 55, 17], 'Distinct removes duplicate numbers using the default equality comparer.');



	var customComparer = function (a, b) { return a === b || (!!a && !!b && a.code === b.code && a.name === b.name); };
    
	source = new List([
        { name: "apple", code: 9 },
        { name: "orange", code: 4 },
        { name: "apple", code: 9 },
        { name: "lemon", code: 12 }
    ]);
    
    result = source.distinct(customComparer).toArray();

	deepEqual(result, [{ name: "apple", code: 9 }, { name: "orange", code: 4 }, { name: "lemon", code: 12 }], 
        'Distinct uses the custom equality comparer if provided.');
});