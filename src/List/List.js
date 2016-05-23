/**
 * @file Defines the List type.
 * @author Chips100
 */

/**
 * Creates a list from the specified array, or an empty list if omitted.
 * @class
 * @augments Enumerable
 * @param {Array|Enumerable} [array] - An array or a sequence with items to initially fill the list with.
 */
function List(array) {
    if (array instanceof Enumerable) {
        array = array.toArray();
    }
    
    this._array = array || [];
}

List.prototype = Object.create(Enumerable.prototype);

List.prototype.add = function(item) {
  this._array.push(item);  
};

List.prototype.addRange = function(items) {
  for (var i = 0, iLength = item.length; i < iLength; i++) {
      this.add(items[i]);
  }  
};

List.prototype.clear = function() {
  this._array.length = 0;  
};

List.prototype.copyTo = function(target, index) {
    index = index || 0;
    
    if (!target) {
        throw new Error('Argument null: target');
    }
    if (index < 0) {
        throw new Error('Argument out of range: index < 0');
    }
    
    var enumerator = this.getEnumerator();
    while(enumerator.moveNext()) {
        target[index] = enumerator.getCurrent();
        index++;
    }
};

/** @this List
 * Returns a number that represents how many elements in the specified sequence satisfy a condition.
 * @override 
 * @param {Function} [predicate] - A function to test each element for a condition. If omitted, all items are counted.
 * @returns {Number} A number that represents how many elements in the sequence satisfy the condition in the predicate function.
 */
List.prototype.count = function(predicate) {
  if (!predicate) {
    return this._array.length;
  }
  else {
    return Enumerable.prototype.count.call(this, predicate);
  }
};

/** @this List
 * Returns the element at a specified index in a sequence.
 * @override 
 * @param {Number} index - The zero-based index of the element to retrieve.
 * @returns {*} The element at the specified position in the source sequence.
 */
List.prototype.elementAt = function(index) {
    return this._array[i];
}

/** @this List
 * Returns an enumerator that iterates through this list.
 * @override
 * @returns {ListEnumerator} An enumerator object that can be used to iterate through this list.
 */
List.prototype.getEnumerator = function() {
  return new ListEnumerator(this._array);  
};