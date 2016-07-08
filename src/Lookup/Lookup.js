/**
 * @file Defines the Lookup type that is used to group elements by keys.
 * @author Chips100
 */

/**
 * Creates a Lookup from a sequence according to a specified key selector function and an element selector function.
 * @class
 * @param {Enumerable|Array} source - The source sequence with the elements to create the Lookup from.
 * @param {Function} keySelector - A function used to extract a key from each element.
 * @param {Function} [elementSelector] - A transform function to produce a result element value from each element.
 * @param {Function|EqualityComparer} [keyEqualityComparer] - Comparer used for comparing keys extracted from elements.
 */
function Lookup(source, keySelector, valueSelector, keyEqualityComparer) {
    LinqAssert.requiredFunction(keySelector, 'keySelector');
    var sourceEnumerable = LinqUtils.createEnumerable(source, 'source');

    this._keyEqualityComparer = LinqUtils.createEqualityComparer(keyEqualityComparer);
    this._lookupByHashcodes = {};
    this._keys = [];

    this._setup(sourceEnumerable, keySelector, LinqUtils.createSelectorFunction(valueSelector));
}

/** Adds the specified value to this lookup, grouping it under the specified key.
 * @this Lookup
 * @private
 * @param {*} key - The key under which the value should be added.
 * @param {*} value - The value to add to this Lookup.
 */
Lookup.prototype._addValueWithKey = function(key, value) {
    var grouping = this._getGroupingByKey(key),
        keyHash = undefined;

    if (!grouping) {        
        grouping = new Grouping(key);
        keyHash = this._keyEqualityComparer.getHashCode(key);

        this._lookupByHashcodes[keyHash] = this._lookupByHashcodes[keyHash] || [];
        this._lookupByHashcodes[keyHash].push(grouping);
        this._keys.push(key);
    }
    
    grouping.addElement(value);
};

/** Gets the grouping for the specified key.
 * @this Lookup
 * @private
 * @param {*} key - The key for which to get the grouping.
 * @returns {Grouping} The grouping that holds the elements for the specified key, or undefined if the key is not used in this Lookup.
 */
Lookup.prototype._getGroupingByKey = function(key) {
    var keyHash = this._keyEqualityComparer.getHashCode(key),
        groupingsWithKeyHash = this._lookupByHashcodes[keyHash];

    if (groupingsWithKeyHash) {
        for (var i = groupingsWithKeyHash.length - 1; i >= 0; i--) {
            if (this._keyEqualityComparer.equals(groupingsWithKeyHash[i].getKey(), key)) {
                return groupingsWithKeyHash[i];
            }
        }
    }
};

/** Initializes this Lookup with the specified elements using the specified key and value selector functions.
 * @this Lookup
 * @private
 * @param {Enumerable} enumerable - The source sequence with the elements to fill this lookup with.
 * @param {Function} keySelector - A function used to extract a key from each element.
 * @param {Function} [elementSelector] - A transform function to produce a result element value from each element.
 */
Lookup.prototype._setup = function(enumerable, keySelector, valueSelector) {
    var enumerator = enumerable.getEnumerator(),
        current = undefined;

    while(enumerator.moveNext()) {
        current = enumerator.getCurrent();
        this._addValueWithKey(keySelector(current), valueSelector(current));
    }
};

/** Transforms the groupings that this Lookup consists of into a sequence.
 * @this Lookup
 * @returns {Enumerable} A sequence with the groupings from this Lookup.
 */
Lookup.prototype.asEnumerable = function() {
    return new LookupEnumerable(this);
};

/** Gets the elements that have been grouped under the specified key.
 * @this Lookup
 * @param {*} key - The key to get elements for.
 * @returns {Enumerable} A sequence with the elements grouped under the specified key.
 */
Lookup.prototype.get = function(key) {
    var grouping = this._getGroupingByKey(key);

    if (grouping) {
        return grouping.getElements();
    }
    else {
        return Enumerable.empty();
    }
};

/** Gets the keys that are known in this Lookup.
 * @this Lookup
 * @returns {Enumerable} A sequence with the keys that are known in this Lookup.
 */
Lookup.prototype.getKeys = function() {
    return new List(this._keys);
};