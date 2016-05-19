function List(array) {
    if (array instanceof Enumerable) {
        array = array.toArray();
    }
    
    this._array = array || [];
}

List.prototype = Object.create(Enumerable.prototype);

List.prototype.add = function(item) {
  this._array.push(item);  
};

List.prototype.addRange = function(items) {
  for (var i = 0, iLength = item.length; i < iLength; i++) {
      this.add(items[i]);
  }  
};

List.prototype.clear = function() {
  this._array.length = 0;  
};

List.prototype.copyTo = function(target, index) {
    index = index || 0;
    
    if (!target) {
        throw new Error('Argument null: target');
    }
    if (index < 0) {
        throw new Error('Argument out of range: index < 0');
    }
    
    var enumerator = this.getEnumerator();
    while(enumerator.moveNext()) {
        target[index] = enumerator.getCurrent();
        index++;
    }
};

List.prototype.count = function(predicate) {
  if (!predicate) {
    return this._array.length;
  }
  else {
    return Enumerable.prototype.count.call(this, predicate);
  }
};

List.prototype.elementAt = function(index) {
    return this._array[i];
}

List.prototype.getEnumerator = function() {
  return new ListEnumerator(this._array);  
};