module('Enumerable#toLookup');
test('ToLookup should group the elements of a sequence by their key.', function () {
    var source = new List([
        { groupId: 4, name: 'Item1' }, 
        { groupId: 4, name: 'Item2' }, 
        { groupId: 3, name: 'Item3' }, 
        { groupId: 3, name: 'Item4' }, 
        { groupId: 3, name: 'Item5' }, 
        { groupId: 3, name: 'Item6' }, 
    ]);
    
    var lookup = source.toLookup(function(x) { return x.groupId; });
    
    deepEqual(lookup.get(3).toArray(), [
        { groupId: 3, name: 'Item3' }, 
        { groupId: 3, name: 'Item4' }, 
        { groupId: 3, name: 'Item5' }, 
        { groupId: 3, name: 'Item6' }], 'Groups items with id 3.');

    deepEqual(lookup.get(4).toArray(), [
        { groupId: 4, name: 'Item1' }, 
        { groupId: 4, name: 'Item2' }], 'Groups items with id 4.');
});

test('ToLookup should project elements using the specified result selector.', function () {
    var source = new List([
        { groupId: 4, name: 'Item1' }, 
        { groupId: 4, name: 'Item2' }, 
        { groupId: 3, name: 'Item3' }, 
        { groupId: 3, name: 'Item4' }, 
        { groupId: 3, name: 'Item5' }, 
        { groupId: 3, name: 'Item6' }, 
    ]);
    
    var lookup = source.toLookup(function(x) { return x.groupId; }, function(x) { return x.name; });
    
    deepEqual(lookup.get(3).toArray(), [ 'Item3', 'Item4', 'Item5', 'Item6'], 'Projects items with id 3.');
    deepEqual(lookup.get(4).toArray(), [ 'Item1', 'Item2'], 'Projects items with id 4.');
});