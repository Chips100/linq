/**
 * @file Adds the static empty method to the Enumerable type.
 * @author Chips100
 */

/** @static
 * Returns an empty sequence.
 * @returns {Enumerable} An empty sequence.
 */
Enumerable.empty = function () {
	if (!Enumerable.empty._singleTon) {
		// First time using the empty singleton.
		// Initialize the Enumerable and Enumerator prototypes with empty methods.	
		EmptyEnumerable.prototype = Object.create(Enumerable.prototype);
		EmptyEnumerable.prototype.getEnumerator = function () { return new EmptyEnumerator(); };

		EmptyEnumerator.prototype.getCurrent = function () { };
		EmptyEnumerator.prototype.reset = function () { };
		EmptyEnumerator.prototype.moveNext = function () { return false; }

		Enumerable.empty._singleTon = new EmptyEnumerable();
	}

	return Enumerable.empty._singleTon;

	function EmptyEnumerable() { }
	function EmptyEnumerator() { }
};