module('Enumerable#groupJoin');
test('GroupJoin should correlate two sequences based on their key selectors, grouping items from the inner sequence.', function () {
    var first = new List([{ id: 1, name: 'User1' }, { id: 2, name: 'User2' }, { id: 3, name: 'User3' }]);
    var second = new List([{ userId: 1, name: 'cat' }, { userId: 1, name: 'dog' }, { userId: 2, name: 'bunny' }]);

    var result = first.groupJoin(second, 
        function(x) { return x.id; }, 
        function(y) { return y.userId; },
        function(x, y) { return { userName: x.name, pets: y } }
    );
    
    strictEqual(2, result.count(), 'Creates correct number of joined results.');
    strictEqual(2, result.single(function(x) { return x.userName === 'User1'}).pets.count(), 'Finds correct number of inner elements for User1.');
    strictEqual(1, result.single(function(x) { return x.userName === 'User2'}).pets.count(), 'Finds correct number of inner elements for User2.');
    ok(result.single(function(x) { return x.userName === 'User1'; }).pets.any(function(p) { return p.name === 'cat'; }), 'Joined cat to User1 correctly.');
    ok(result.single(function(x) { return x.userName === 'User1'; }).pets.any(function(p) { return p.name === 'dog'; }), 'Joined dog to User1 correctly.');
    ok(result.single(function(x) { return x.userName === 'User2'; }).pets.any(function(p) { return p.name === 'bunny'; }), 'Joined bunny to User2 correctly.');
});

test('GroupJoin should use the specified EqualityComparer to compare selected keys.', function () {
    var first = new List([{ id: 1, name: 'User1' }, { id: 2, name: 'User2' }, { id: 3, name: 'User3' }]);
    var second = new List([{ userId: 1, name: 'cat' }, { userId: 1, name: 'dog' }, { userId: 2, name: 'bunny' }]);

    var result = first.groupJoin(second, 
        function(x) { return x.id; }, 
        function(y) { return y.userId },
        function(x, y) { return { userName: x.name, pets: y.select(function(p) { return p.name }).toArray() } },
        function(a, b) { return true; }
    );
    
    strictEqual(result.count(), 3, 'Creates correct number of results.');
    ok(result.all(function(x) { return x.pets.length === 3; }), 'Joins elements using the specified equality comparer.');
});