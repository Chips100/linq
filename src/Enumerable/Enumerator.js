/**
 * @file Documents the structure of the Enumerator type.
 */

/**
 * @typedef Enumerator
 * @type Object
 * Supports a simple iteration over a collection.
 * @property {MoveNextFunction} moveNext Advances the enumerator to the next element of the collection.
 * @property {GetCurrentFunction} getCurrent Gets the current element in the collection.
 * @property {ResetFunction} reset Sets the enumerator to its initial position, which is before the first element in the collection.
 */

/**
 * @name MoveNextFunction
 * @function
 * Advances the enumerator to the next element of the collection.
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
		
/**
 * @name GetCurrentFunction
 * @function
 * Gets the current element in the collection.
 * @returns {*} The current element in the collection.
 */
		
/**
 * @name ResetFunction
 * @function
 * Sets the enumerator to its initial position, which is before the first element in the collection.
 */