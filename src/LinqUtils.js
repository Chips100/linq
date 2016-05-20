/**
 * @file Provides utility methods on an object named LinqUtils.
 * @author Chips100
 * @todo At least some functionality should be extracted into a LinqAssert helper for better semantics.
 */
var LinqUtils = {
  /**
   * Throws an error if the specified value is not a sequence.
   * @param {*} value - The value that should be a sequence.
   * @param {String} parameterName - The name of the parameter by which the sequence should have been supplied.
   */
  checkEnumerableArgument: function(value, parameterName) {
    if (!this.isEnumerable(value)) {
        this.throwArgumentError(parameterName);
    }  
  },
  
  /**
   * Throws an error if the specified value is not a function.
   * @param {*} value - The value that should be a function.
   * @param {String} parameterName - The name of the parameter by which the function should have been supplied.
   */
  checkFunctionArgument: function(value, parameterName) {
    if (!this.isFunction(value)) {
        this.throwArgumentError(parameterName);
    }  
  },
  
  /** 
   * Throws an error if the specified value is not a number or does not fulfill the specified constraints.
   * @param {any} value - The value that should be a number fulfilling the specified constraints.
   * @param {String} parameterName - The name of the parameter by which the function should have been supplied.
   * @param {Object} [constraints] - Additional constraints that should be fulfilled by the value.
   * @param {Number} [constraints.min] - The minimum value that should be allowed.
   * @param {Number} [constraints.max] - The maximum value that should be allowed.
   */
  checkNumberArgument: function(value, parameterName, constraints) {
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
  
  /** 
   * Throws an error if the specified value is not a positive number (including zero).
   * @param {any} value - The value that should be a positive number.
   * @param {String} parameterName - The name of the parameter by which the function should have been supplied.
   */
  checkPositiveNumberArgument: function(value, parameterName) {
    this.checkNumberArgument(value, parameterName, { min: 0 });
  },
  
  /** 
   * Returns the specified equality comparer function if supplied correctly, otherwise the default equality comparer.
   * @param {Function} [comparer] - The equality comparer function that should be used if supplied.
   * @returns {Function} The specified equality comparer function if supplied correctly, otherwise false.
   */
  checkOptionalEqualityComparer: function(comparer) {
    return this.isFunction(comparer) ? comparer : this.defaultEqualityComparer;  
  },
  
  /** 
   * Creates an equality comparer with implementations of equals and getHashCode by the specified value.
   * If the value is a function, it will be used as the equals implementation.
   * If the value is an object with an equals function, it will be returned.
   * Otherwise, a default equality comparer is returned.
   * @param {Function|Object} [comparer] - The value to create the equality comparer from.
   * @returns {Function} The specified equality comparer function if supplied correctly, otherwise false.
   */
  createEqualityComparer: function(comparer) {
    if (comparer && this.isFunction(comparer.equals)) {
      // Comparer provided in a correct format.
      // Return the original object, as it might rely on its this binding.
      // If it does not implement getHashCode, we inject a default implementation.
      comparer.getHashCode = this.isFunction(comparer.getHashCode) ? comparer.getHashCode : defaultGetHashCodeFunction;
      return comparer;
    }
    else {
      return {
        equals: this.isFunction(comparer) ? comparer : this.defaultEqualityComparer,
        getHashCode: defaultGetHashCodeFunction
      };
    }
    
    function defaultGetHashCodeFunction(arg) {
      return 1;
    }
  },
  
  /** 
   * Default equality comparer function that checks two arguments for equality.
   * @param {any} [a] - The first value that should be checked for equality.
   * @param {any} [b] - The second value that should be checked for equality.
   * @returns {Boolean} True, if the arguments are equal, otherwise false.
   */
  defaultEqualityComparer: function(a, b) {
    return a === b;  
  },
    
  /** 
   * Determines if the specified value is a sequence.
   * @param {any} [input] - Value that could be a sequence.
   * @returns {Boolean} True, if the specified value is a sequence; otherwise false.
   */
  isEnumerable: function(input) {
    return input instanceof Enumerable;
  },
    
  /** 
   * Determines if the specified value is a function.
   * @param {any} [input] - Value that could be a function.
   * @returns {Boolean} True, if the specified value is a function; otherwise false.
   */
  isFunction: function(input) {
    return typeof(input) === 'function';
  },
  
  /** 
   * Throws an error indicating an invalid argument value.
   * @param {String} parameterName - The name of the parameter by which an invalid value has been supplied.
   */
  throwArgumentError: function(parameterName) {
    throw new Error('Invalid parameter: ' + parameterName);
  },
  
  /** 
   * Throws an error indicating an argument value being out of range.
   * @param {String} parameterName - The name of the parameter by which a value out of range has been supplied.
   */
  throwArgumentOutOfRangeError: function(parameterName) {
    throw new Error('Parameter value out of range: ' + parameterName);
  },
  
  /** 
   * Throws an error indicating a sequence containing no matching elements when it should have.
   */
  throwNoMatchingItemError: function() {
    throw new Error('No item matched the predicate or sequence was empty');
  },
  
  /** 
   * Throws an error indicating a sequence containing multiple matching elements when it should have not.
   */
  throwMultipleMatchingItemsError: function() {
    throw new Error('sequence contained multiple matching elements');
  }
};