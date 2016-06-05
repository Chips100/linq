module('Enumerable#selectMany');
test('SelectMany should provide the index of the value in the source sequence to the selector and project the result with the resultSelector.', function () {
	var source = new List([3, 5, 20, 15]);
    var result = source.selectMany(
        function (x, i) { return (x + i).toString().split(''); }, 
        function (x, c) { return x + ': ' + c }
    ).toArray();
    
	deepEqual(result, ["3: 3", "5: 6", "20: 2", "20: 2", "15: 1", "15: 8"], 'Passes the correct index to the collectionSelector and uses the resultSelector.')
});