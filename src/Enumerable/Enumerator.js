/**
 * @file Documents the structure of the Enumerator type.
 */

/**
 * @typedef Enumerator
 * @desc Supports a simple iteration over a collection.
 * @type Object
 * @property {MoveNextFunction} moveNext Advances the enumerator to the next element of the collection.
 * @property {GetCurrentFunction} getCurrent Gets the current element in the collection.
 * @property {ResetFunction} reset Sets the enumerator to its initial position, which is before the first element in the collection.
 */

/**
 * @function MoveNextFunction
 * @desc Advances the enumerator to the next element of the collection.
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
		
/**
 * @function GetCurrentFunction
 * @desc Gets the current element in the collection.
 * @returns {*} The current element in the collection.
 */
		
/**
 * @function ResetFunction
 * @desc Sets the enumerator to its initial position, which is before the first element in the collection.
 */