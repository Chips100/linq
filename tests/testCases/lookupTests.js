(function() {
    module('Lookup');
    
    test('Lookup should check arguments passed to the constructor.', function () {
        var source = getTestSource();
        var keySelector = function(x) { return x.groupId; };

        throws(function () {
            var lookup = new Lookup(undefined, keySelector);
        }, /Invalid parameter: source/, 'Throws error for invalid source parameter.');

        throws(function () {
            var lookup = new Lookup(source, undefined);
        }, /Invalid parameter: keySelector/, 'Throws error for invalid keySelector parameter.');

        var lookup = new Lookup(source, keySelector);
        ok(true, 'Does not throw error if source and keySelector parameter are provided.');
    });

    test('Lookup should correctly handle empty sources', function() {
        var source = new List([]);
        var lookup = new Lookup(source, function(x) { return x });

        strictEqual(0, lookup.getKeys().count(), 'Lookup created from empty sequence contains no keys.');
    });

    test('Lookup should group the elements of a sequence by their key.', function () {
        var source = getTestSource();
        var lookup = new Lookup(source, function(x) { return x.groupId; });
        
        deepEqual(lookup.get(3).toArray(), [
            { groupId: 3, name: 'Item3' }, 
            { groupId: 3, name: 'Item4' }, 
            { groupId: 3, name: 'Item5' }, 
            { groupId: 3, name: 'Item6' }], 'Groups items with id 3.');

        deepEqual(lookup.get(4).toArray(), [
            { groupId: 4, name: 'Item1' }, 
            { groupId: 4, name: 'Item2' }], 'Groups items with id 4.');
    });

    test('Lookup should return empty enumerables when unkown keys are requested.', function () {
        var source = getTestSource();
        var lookup = new Lookup(source, function(x) { return x.groupId; });
        
        var elements = lookup.get(35564);
        ok(elements instanceof Enumerable, 'Returns an Enumerable for unknown keys.');
        strictEqual(elements.count(), 0, 'No elements are returned for unknown keys.');
    });

    test('Lookup should project elements using the specified result selector.', function () {
        var source = getTestSource();
        var lookup = new Lookup(source, function(x) { return x.groupId; }, function(x) { return x.name; });
        
        deepEqual(lookup.get(3).toArray(), [ 'Item3', 'Item4', 'Item5', 'Item6'], 'Projects items with id 3.');
        deepEqual(lookup.get(4).toArray(), [ 'Item1', 'Item2'], 'Projects items with id 4.');
    });
    
    test('Lookup should support arbitrary objects as keys.', function () {
        var source = getTestSource();
        var lookup = new Lookup(source, function(x) { return x; }, function(x) { return x.name; });

        var firstKey = source.first();
        var secondKey = source.elementAt(1);

        deepEqual(lookup.get(firstKey).toArray(), ['Item1'], 'Uses first element from source sequence as key.');
        deepEqual(lookup.get(secondKey).toArray(), ['Item2'], 'Uses second element from source sequence as key.');
    });

    test('Lookup should use the specified equality comparer for comparing keys.', function() {
        var hashCounter = 0;
        var source = getTestSource();
        var equalityComparer = { equals: function(a, b) { return true; }, getHashCode: function(x) { hashCounter++; return 1; }};

        var lookup = new Lookup(source, function(x) { return x.groupId; }, function(x) { return x.name; }, equalityComparer);

        var elementsWithKey3 = lookup.get(3);
        var elementsWithKey4 = lookup.get(4);

        ok(hashCounter > 0, 'Used custom implementation of getHashCode.');
        strictEqual(elementsWithKey3.toArray().length, 6, 'Grouped all items from source sequence under key 3.');
        deepEqual(elementsWithKey3.toArray(), elementsWithKey4.toArray(), 'Grouped items with keys 3 and 4 under the same key.');
    });

    test('Lookup#asEnumerable should create an Enumerable that iterates over all groupings.', function() {
        var lookup = new Lookup(getTestSource(), function(x) { return x.groupId; });

        var enumerable = lookup.asEnumerable();

        ok(enumerable instanceof Enumerable, 'Lookup#asEnumerable returned an instance of Enumerable');
        strictEqual(lookup.getKeys().count(), enumerable.count(), 'Enumerable has as many elements as there are keys in the Lookup.');
        deepEqual(enumerable.first().toArray(), lookup.get(enumerable.first().key).toArray());
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