/**
 * @file Defines the List type.
 * @author Chips100
 */

/**
 * Creates a list from the specified sequence, or an empty list if omitted.
 * @class
 * @augments Enumerable
 * @param {Array|Enumerable} [array] - An array or a sequence with items to initially fill the list with.
 */
function List(array) {
    if (!array) {
        this._array = [];
    }
    else if (LinqUtils.isArray(array)) {
        this._array = array.splice(0);
    }
    else if (LinqUtils.isEnumerable(array)) {
        this._array = array.toArray();
    }
    else {
        LinqAssert.throwArgumentError('array');
    }
}

// Put the Enumerable prototype into the prototype chain.
List.prototype = Object.create(Enumerable.prototype);

/** @this List
 * Adds an object to the end of the List. 
 * @param {*} item - The object to be added to the end of the List.
 */
List.prototype.add = function(item) {
  this._array.push(item);  
};

/** @this List
 * Adds the elements of the specified collection to the end of the List.
 * @param {Array|Enumerable} items - The sequence whose elements should be added to the end of the List.
 */
List.prototype.addRange = function(items) {
  items = LinqUtils.createEnumerable(items);
  
  var enumerator = items.getEnumerator();
  while(enumerator.moveNext()) {
      this.add(enumerator.getCurrent());
  }
};

/** @this List
 * Removes all elements from the List.
 */
List.prototype.clear = function() {
  this._array.length = 0;  
};

/** @this List
 * Copies a range of elements from this List to a one-dimensional array, starting at the specified index of the target array.
 * @param {Number} [index] - The zero-based index in this List at which copying begins. If omitted, the complete List is copied.
 * @param {Array} [array] - The one-dimensional Array that is the destination of the elements copied from List.
 * @param {Number} [arrayIndex] - The zero-based index in array at which copying begins.
 * @param {Number} [count] - The number of elements to copy. If omitted, all elements to the end of the list are copied.
 */
List.prototype.copyTo = function(index, array, arrayIndex, count) {
    // Check if index parameter was omitted
    if (LinqUtils.isArray(index)) {
        count = arrayIndex;
        arrayIndex = array;
        array = index;
        index = 0;
    }
    
    // Check if other parameters were omitted in a supported manner.
    arrayIndex = arrayIndex || 0;
    count = count || +Infinity;
    
    // Check arguments.
    LinqAssert.requiredValue(array);
    LinqAssert.requiredPositiveNumber(index, 'index');
    LinqAssert.requiredPositiveNumber(arrayIndex, 'arrayIndex');
    LinqAssert.requiredPositiveNumber(count, 'count');
    
    var skipped = 0,
        counter = 0,
        currentIndex = 0,
        enumerator = this.getEnumerator();
    
    // Skip elements from this sequence to start at the specified index.    
    while (skipped < index) {
        enumerator.moveNext();
        skipped++;
    }
    
    while(count > counter && enumerator.moveNext()) {
        array[currentIndex] = enumerator.getCurrent();
        currentIndex++;
        counter++;
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

/** @this List
 * Inserts an element into this List at the specified index.
 * @param {Number} index - The zero-based index at which the element should be inserted.
 * @param {*} element - The value to insert.
 */
List.prototype.insert = function(index, element) {
    this._array.splice(index, 0, element);
};

/** @this List
 * Inserts the elements of an array or a sequence into this List at the specified index.
 * @param {Number} index - The zero-based index at which the new elements should be inserted.
 * @param {Array|Enumerable} elements - The sequence whose elements should be inserted into this List.
 */
List.prototype.insertRange = function(index, elements) {
    LinqAssert.requiredPositiveNumber(index, 'index');
    elements = LinqUtils.createEnumerable(elements, 'elements');
    
    // First parameters for the splice call.
    var args = [index, 0];
    
    // The values to insert should be supplied as individual parameters to splice.
    // We make use of the "apply" method to provide the values in an array.
    var enumerator = elements.getEnumerator();
    while(enumerator.moveNext()) {
        args.push(enumerator.getCurrent());
    }
    
    Array.prototype.splice.apply(this._array, args);
};