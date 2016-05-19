/**
 * @file Adds the elementAt method to the Enumerable prototype.
 * @author Chips100
 */

/** @this Enumerable 
 * Returns the element at a specified index in a sequence.
 * @param {Number} index - The zero-based index of the element to retrieve.
 * @returns {*} The element at the specified position in the source sequence.
 */
Enumerable.prototype.elementAt = function(index) {
  if (index < 0) {
    LinqUtils.throwArgumentOutOfRangeError('index');
  }
  
  var enumerator = this.getEnumerator(),
      iterator = 0;
  
  while (iterator <= index) {
    if (!enumerator.moveNext()) {
      LinqUtils.throwArgumentOutOfRangeError('index');
    }
    
    iterator++;
  }

  return enumerator.getCurrent();
};