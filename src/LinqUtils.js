var LinqUtils = {
  checkFunctionArgument: function(value, parameterName) {
    if (!this.isFunction(value)) {
        this.throwArgumentError(parameterName);
    }  
  },
  
  checkOptionalEqualityComparer: function(comparer) {
    return this.isFunction(comparer) ? comparer : this.defaultEqualityComparer;  
  },
  
  defaultEqualityComparer: function(a, b) {
    return a === b;  
  },
    
  isFunction: function(input) {
    return typeof(input) === 'function';
  },
  
  throwArgumentError: function(parameterName) {
    throw new Error('Invalid parameter: ' + parameterName);
  },
  
  throwArgumentOutOfRangeError: function(parameterName) {
    throw new Error('Parameter value out of range: ' + parameterName);
  },
  
  throwNoMatchingItemError: function() {
    throw new Error('No item matched the predicate or sequence was empty');
  },
  
  throwMultipleMatchingItemsError: function() {
    throw new Error('sequence contained multiple matching elements');
  }
};