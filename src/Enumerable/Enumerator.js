/**
 * @file Documents the structure of the Enumerator type.
 */

/** Supports a simple iteration over a collection.
 * @typedef Enumerator
 * @type Object
 * @property {MoveNextFunction} moveNext Advances the enumerator to the next element of the collection.
 * @property {GetCurrentFunction} getCurrent Gets the current element in the collection.
 * @property {ResetFunction} reset Sets the enumerator to its initial position, which is before the first element in the collection.
 */

/** Advances the enumerator to the next element of the collection.
 * @function MoveNextFunction
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
		
/** Gets the current element in the collection.
 * @function GetCurrentFunction
 * @returns {*} The current element in the collection.
 */
		
/** Sets the enumerator to its initial position, which is before the first element in the collection.
 * @function ResetFunction
 */