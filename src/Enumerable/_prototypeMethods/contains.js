/**
 * @file Adds the contains method to the Enumerable prototype.
 * @author Chips100
 */

/** @this Enumerable 
 * Determines whether a sequence contains a specified element by using a specified comparer.
 * @param {*} value - The value to locate in the sequence.
 * @param {Function} [comparer] - An equality comparer to compare values. If ommited, equality is checked by strict equality.
 * @returns {Boolean} true if the source sequence contains an element that has the specified value; otherwise, false.
 */
Enumerable.prototype.contains = function(value, comparer) {
	comparer = LinqUtils.checkOptionalEqualityComparer(comparer);
	
	var enumerator = this.getEnumerator(),
		current;
	
	while(enumerator.moveNext()) {
		current = enumerator.getCurrent();
		
		if (comparer.call(current, current, value)) {
			return true;	
		}
	}
	
	return false;
};