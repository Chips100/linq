/**
 * @file Adds the elementAtOrDefault method to the Enumerable prototype.
 * @author Chips100
 */

/** Returns the element at a specified index in a sequence, or null if the specified index is out of range.
 * @this Enumerable 
 * @param {Number} index - The zero-based index of the element to retrieve.
 * @returns {*} The element at the specified position in the source sequence, or null if the index is out of range.
 */
Enumerable.prototype.elementAtOrDefault = function (index) {
    if (index < 0) {
        return null;
    }

    var enumerator = this.getEnumerator(),
        iterator = 0;

    while (iterator <= index) {
        if (!enumerator.moveNext()) {
            return null;
        }

        iterator++;
    }

    return enumerator.getCurrent();
};