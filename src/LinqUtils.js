/**
 * @file Provides utility methods on an object named LinqUtils.
 * @author Chips100
 * @todo At least some functionality should be extracted into a LinqAssert helper for better semantics.
 */
var LinqUtils = {
  /** 
   * Creates an Enumerable from the specified value. 
   * If the input is not suitable to be converted to an Enumerable, an exception is thrown.
   * @param {Array|Enumerable} input - The value to convert to an Enumerable.
   * @param {String} parameterName - The name of the parameter by which the Enumerable should have been supplied.
   * @returns {Enumerable} The specified equality comparer function if supplied correctly, otherwise false.
   */
  createEnumerable: function (input, parameterName) {
    if (this.isEnumerable(input)) {
      return input;
    }
    else if (this.isArray(input)) {
      // Creation of a list by an array should be cheap enough.
      return new List(input);
    }
    else {
      LinqAssert.throwArgumentError(parameterName);
    }
  },

  /** 
   * Creates an equality comparer with implementations of equals and getHashCode by the specified value.
   * If the value is a function, it will be used as the equals implementation.
   * If the value is an object with an equals function, it will be returned.
   * Otherwise, a default equality comparer is returned.
   * @param {Function|Object} [comparer] - The value to create the equality comparer from.
   * @returns {Function} The specified equality comparer function if supplied correctly, otherwise false.
   */
  createEqualityComparer: function (comparer) {
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
   * Creates a selector function by the specfied value.
   * If the value is a valid selector function, it will be returned; otherwise a default selector function will be returned.
   * @param {Function} [selector] - The selector function that should be used if it is a valid selector function.
   * @returns {Function} Selector function that can be used to project elements.
   */
  createSelectorFunction: function(selector) {
    return this.isFunction(selector) ? selector : this.defaultSelectorFunction;
  },

  /** 
   * Default equality comparer function that checks two arguments for equality.
   * @param {*} [a] - The first value that should be checked for equality.
   * @param {*} [b] - The second value that should be checked for equality.
   * @returns {Boolean} True, if the arguments are equal, otherwise false.
   */
  defaultEqualityComparer: function (a, b) {
    return a === b;
  },

  /** 
   * Default selector function to use when elements should be projected.
   * @param {*} [x] - The value to project.
   * @returns {*} The projected value.
   */
  defaultSelectorFunction: function(x) {
    return x;
  },

  /** 
   * Determines if the specified value is an array.
   * @param {*} [input] - Value that could be an array.
   * @returns {Boolean} True, if the specified value is an array; otherwise false.
   */
  isArray: function (input) {
    // http://stackoverflow.com/questions/4775722/check-if-object-is-array
    return Object.prototype.toString.call(input) === '[object Array]';
  },

  /** 
   * Determines if the specified value is a sequence.
   * @param {*} [input] - Value that could be a sequence.
   * @returns {Boolean} True, if the specified value is a sequence; otherwise false.
   */
  isEnumerable: function (input) {
    return input instanceof Enumerable;
  },

  /** 
   * Determines if the specified value is a function.
   * @param {*} [input] - Value that could be a function.
   * @returns {Boolean} True, if the specified value is a function; otherwise false.
   */
  isFunction: function (input) {
    return typeof (input) === 'function';
  }
};