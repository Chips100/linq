/**
 * @file Provides utility methods to assert preconditions in algorithms.
 * @author Chips100
 */
var LinqAssert = {
  /** Throws an error if the specified value is not a sequence.
   * @param {*} value - The value that should be a sequence.
   * @param {String} parameterName - The name of the parameter by which the sequence should have been supplied.
   */
  requiredEnumerable: function(input, parameterName) {
    if (!LinqUtils.isEnumerable(input)) {
      this.throwArgumentError(parameterName);
    }
  },
  
  /** Throws an error if the specified value is not a function.
   * @param {*} value - The value that should be a function.
   * @param {String} parameterName - The name of the parameter by which the function should have been supplied.
   */
  requiredFunction: function(value, parameterName) {
    if (!LinqUtils.isFunction(value)) {
        this.throwArgumentError(parameterName);
    }  
  },
  
  /** Throws an error if the specified value is not a number or does not fulfill the specified constraints.
   * @param {*} value - The value that should be a number fulfilling the specified constraints.
   * @param {String} parameterName - The name of the parameter by which the function should have been supplied.
   * @param {Object} [constraints] - Additional constraints that should be fulfilled by the value.
   * @param {Number} [constraints.min] - The minimum value that should be allowed.
   * @param {Number} [constraints.max] - The maximum value that should be allowed.
   */
  requiredNumber: function(value, parameterName, constraints) {
    constraints = constraints || {};
    
    if (isNaN(value)) {
      this.throwArgumentError(parameterName);
    }
    
    if (!isNaN(constraints.min) && +constraints.min > +value) {
      this.throwArgumentOutOfRangeError(parameterName);
    }
    
    if (!isNaN(constraints.max) && +constraints.max < +value) {
      this.throwArgumentOutOfRangeError(parameterName);
    }
  },
  
  /** Throws an error if the specified value is not a positive number (including zero).
   * @param {*} value - The value that should be a positive number.
   * @param {String} parameterName - The name of the parameter by which the number should have been supplied.
   */
  requiredPositiveNumber: function(value, parameterName) {
    this.requiredNumber(value, parameterName, { min: 0 });
  },
    
  /** Throws an error if the specified value is a null value.
   * @param {*} value - The value that should not be null.
   * @param {String} parameterName - The name of the parameter by which the value should have been supplied.
   */
  requiredValue: function(value, parameterName) {
    if (!value) {
      this.throwArgumentNullError(parameterName);
    }
  },
    
  /** Throws an error indicating an invalid argument value.
   * @param {String} parameterName - The name of the parameter by which an invalid value has been supplied.
   */
  throwArgumentError: function(parameterName) {
    throw new Error('Invalid parameter: ' + parameterName);
  },
    
  /** Throws an error indicating a null value for a required parameter.
   * @param {String} parameterName - The name of the parameter by which an invalid value has been supplied.
   */
  throwArgumentNullError: function(parameterName) {
    throw new Error('Argument was null: ' + parameterName);
  },
  
  /** Throws an error indicating an argument value being out of range.
   * @param {String} parameterName - The name of the parameter by which a value out of range has been supplied.
   */
  throwArgumentOutOfRangeError: function(parameterName) {
    throw new Error('Parameter value out of range: ' + parameterName);
  },
  
  /** Throws an error indicating a sequence containing no matching elements when it should have.
   */
  throwNoMatchingItemError: function() {
    throw new Error('No item matched the predicate or sequence was empty');
  },
  
  /** Throws an error indicating a sequence containing multiple matching elements when it should have not.
   */
  throwMultipleMatchingItemsError: function() {
    throw new Error('Multiple items in the sequence matched the predicate.');
  },

  /** Throws an error indicating a sequence being empty when it should not be.
   */
  throwSequenceEmptyError: function() {
    throw new Error('Sequence contains no elements');
  },
};