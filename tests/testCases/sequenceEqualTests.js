(function() {
    module('Enumerable#sequenceEqual');
    test('sequenceEqual should throw an error if no second sequence is specified.', function () {
        var source = new List([]);

        throws(function () {
            source.sequenceEqual(null);
        }, /Invalid parameter: second/, 'Throws error if no second sequence is specified.');
    });

    test('sequenceEqual should return true when comparing two empty sequences.', function () {
        var a = new List([]),
            b = new List([]);

        ok(a.sequenceEqual(b), 'sequenceEqual returns true for two empty sequences.');
    });
    
    test('sequenceEqual should return true when comparing two sequences with equal elements.', function () {
        var a = new List([1, 2, 3, 4, 5]),
            b = new List([1, 2, 3, 4, 5]);

        ok(a.sequenceEqual(b), 'sequenceEqual returns true for two sequences with equal elements.');
    });
    
    test('sequenceEqual should return false when comparing two sequences with differing elements.', function () {
        var a = new List([1, 2, 3, 4, 5]),
            b = new List([5, 4, 3, 2, 1]);

        ok(!a.sequenceEqual(b), 'sequenceEqual returns false for two sequences with differing elements.');
    });
    
    test('sequenceEqual should use the specified equality comparer function.', function () {
        var a = new List([1, 2, 3]);
        var b = new List([1, 2, 3]);
        var c = new List([2, 4, 6]);

        ok(a.sequenceEqual(c, function() { return true; }), 'sequenceEqual uses the specified equality comparer.');
        ok(!a.sequenceEqual(b, function() { return false}), 'sequenceEqual uses the specified equality comparer.');
    });

    test('sequenceEqual should use the specified equality comparer if specifed as an object.', function () {
        var a = new List([1, 2, 3]);
        var b = new List([1, 2, 3]);
        var c = new List([2, 4, 6]);

        ok(a.sequenceEqual(c, { equals: function() { return true; } }), 'sequenceEqual uses the specified equality comparer.');
        ok(!a.sequenceEqual(b, { equals: function() { return false; } }), 'sequenceEqual uses the specified equality comparer.');
    });
})();