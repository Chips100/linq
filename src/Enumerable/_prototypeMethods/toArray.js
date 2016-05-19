/**
 * @file Adds the toArray method to the Enumerable prototype.
 * @author Chips100
 */

/** @this Enumerable 
 * Copies the elements of this sequence to a new array.
 * @returns {Array} An array containing copies of the elements of this sequence.
 */
Enumerable.prototype.toArray = function() {
	var result = [],
		enumerator = this.getEnumerator();
		
	while(enumerator.moveNext()) {
		result.push(enumerator.getCurrent());
	}
	
	return result;
};