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

test('Join should produce seperate result items for each matching item from the inner sequence.', function () {
    var first = new List([{ id: 1, name: 'User1' }, { id: 2, name: 'User2' }, { id: 3, name: 'User3' }]);
    var second = new List([{ userId: 1, name: 'cat' }, { userId: 1, name: 'dog' }, { userId: 2, name: 'bunny' }]);

    var result = first.join(second, 
        function(x) { return x.id; }, 
        function(y) { return y.userId },
        function(x, y) { return { userName: x.name, petName: y.name } },
        function(a, b) { return a%3 === b%3; }
    );
    
    strictEqual(3, result.count(), 'Creates correct number of joined items.');
    strictEqual(2, result.where(function(x) { return x.userName === 'User1' }).count(), 'Joins two items from inner sequence for User 1.');
    strictEqual(0, result.where(function(x) { return x.userName === 'User3' }).count(), 'Creates no item for User 3');
    ok(result.any(function(x) { return x.userName === 'User1' && x.petName === 'cat'; }), 'Joins correct item cat for User 1.');
    ok(result.any(function(x) { return x.userName === 'User1' && x.petName === 'dog'; }), 'Joins correct item dog for User 1.');
    ok(result.any(function(x) { return x.userName === 'User2' && x.petName === 'bunny'; }), 'Joins correct item bunny for User 2.');
});