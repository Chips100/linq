Enumerable.prototype.elementAt = function(index) {
  if (index < 0) {
        throwArgumentOutOfRangeError();
  }
  
  var enumerator = this.getEnumerator(),
      iterator = 0;
  
  while (iterator <= index) {
      if (!enumerator.moveNext()) {
        throwArgumentOutOfRangeError();
      }
  }

  return enumerator.getCurrent();
  
  function throwArgumentOutOfRangeError() {
      throw new Error('Index out of range.');
  }
};