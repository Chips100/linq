module('Enumerable#join');
test('Join should correlate two sequences based on their key selectors.', function () {
    var first = new List([{ id: 1, name: 'apple', color: 1 }, { id: 2, name: 'pineapple', color: 2 }, { id: 3, name: 'orange', color: 3 }]);
    var second = new List([{ id: 1, name: 'red' }, { id: 2, name: 'yellow' }, { id: 3, name: 'orange' }])

    var result = first.join(second, 
        function(x) { return x.color; }, 
        function(y) { return y.id },
        function(x, y) { return { fruit: x.name, color: y.name } }
    );
    
    deepEqual(result.toArray(), [
        { fruit: 'apple', color: 'red' },
        { fruit: 'pineapple', color: 'yellow' },
        { fruit: 'orange', color: 'orange' }
    ], 'Joins sequences based on the specified key selectors.');
});

test('Join should use the specified EqualityComparer to compare selected keys.', function () {
    var first = new List([{ id: 1, name: 'apple', color: 1 }, { id: 2, name: 'pineapple', color: 2 }, { id: 3, name: 'orange', color: 3 }]);
    var second = new List([{ id: 4, name: 'red' }, { id: 5, name: 'yellow' }, { id: 6, name: 'orange' }])

    var result = first.join(second, 
        function(x) { return x.color; }, 
        function(y) { return y.id },
        function(x, y) { return { fruit: x.name, color: y.name } },
        function(a, b) { return a%3 === b%3; }
    );
    
    deepEqual(result.toArray(), [
        { fruit: 'apple', color: 'red' },
        { fruit: 'pineapple', color: 'yellow' },
        { fruit: 'orange', color: 'orange' }
    ], 'Joins uses the specified EqualityComparer to compare selected keys..');
});