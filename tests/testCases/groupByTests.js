(function() {
    module('Enumerable#groupBy');
    test('groupBy should throw an error if no keySelector is specified.', function () {
        var source = getTestSource();

        throws(function () {
            source.groupBy(null);
        }, /Invalid parameter: keySelector/, 'Throws error if no keySelector is specified.');
    });
    
    test('groupBy should return a sequence of groupings for each key.', function () {
        var source = getTestSource();

        var groupings = source.groupBy(function(x) { return x.groupId; });

        ok(groupings instanceof Enumerable, 'groupBy returns a sequence');
        strictEqual(2, groupings.count(), 'groupBy creates the correct number of groupings.');
        strictEqual(2, groupings.single(function(g) { return g.key === 4}).count(), 'groupBy put the correct number of items in grouping with key 4.');
        ok(groupings.single(function(g) { return g.key === 4}).any(function(x) { return x.name === 'Item2'; }), 'groupBy put the correct items in grouping with key 4.');
    });

    test('groupBy should use the provided element selector.', function () {
        var source = getTestSource();

        var groupings = source.groupBy(function(x) { return x.groupId; }, function(x) { return 'X'; });

        ok(groupings instanceof Enumerable, 'groupBy returns a sequence');
        strictEqual(2, groupings.count(), 'groupBy creates the correct number of groupings.');
        strictEqual('XX', groupings.single(function(g) { return g.key === 4}).toArray().join(''), 'groupBy grouped the correctly projected elements with key 4');
        strictEqual('XXXX', groupings.single(function(g) { return g.key === 3}).toArray().join(''), 'groupBy grouped the correctly projected elements with key 4');
    });

    test('groupBy should use the provided result selector.', function () {
        var source = getTestSource();
        
        var groupings = source.groupBy(function(x) { return x.groupId; }, function(x) { return 'X'; }, function(g) { return g.toArray().join(''); });

        ok(groupings instanceof Enumerable, 'groupBy returns a sequence');
        strictEqual(2, groupings.count(), 'groupBy creates the correct number of groupings.');
        ok(groupings.contains('XXXX'), 'groupBy correctly used the result selector on elements with key 3');
        ok(groupings.contains('XX'), 'groupBy correctly used the result selector on elements with key 4');
    });

    test('groupBy should work correctly when all parameters are supplied', function() {
        var source = getTestSource();

        var results = source.groupBy(function(x) { return x.groupId; }, 
            function(x) { return x.name.charAt(0); },    // Element Selector
            function(x) { return x.toArray().join('') },   // Result Selector
            function(x) { return true;});           // Key Comparer

        strictEqual(1, results.count(), 'groupBy used the key comparer function.');
        strictEqual(results.first(), 'IIIIII', 'groupBy used the element and result selectors.');
    });
    
    test('groupBy should use the equality comparer if specified with equals and getHashCode methods.', function() {
        var source = getTestSource();
        var hashCodeFunctionCalled = false;

        var results = source.groupBy(function(x) { return x.groupId; }, 
            function(x) { return x.name.charAt(0); },    // Element Selector
            function(x) { return x.toArray().join('') },   // Result Selector
            { equals: function() {return true;}, getHashCode: function() {
                hashCodeFunctionCalled = true;
                return 1;
            } });           // Key Comparer

        strictEqual(1, results.count(), 'groupBy used the key comparer function.');
        ok(hashCodeFunctionCalled, 'groupBy used the implementation provided for getHashCode.');
        strictEqual(results.first(), 'IIIIII', 'groupBy used the element and result selectors.');
    });


    function getTestSource() {   
        return new List([
            { groupId: 4, name: 'Item1' }, 
            { groupId: 4, name: 'Item2' }, 
            { groupId: 3, name: 'Item3' }, 
            { groupId: 3, name: 'Item4' }, 
            { groupId: 3, name: 'Item5' }, 
            { groupId: 3, name: 'Item6' }, 
        ]);
    }
})();