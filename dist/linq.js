

/**
 * @file Adds the aggregate method to the Enumerable prototype.
 * @author Chips100
 */

/** Applies an accumulator function over a sequence.
 * @this Enumerable
 * @param {*} [seed] - The initial accumulator value.
 * @param {Function} func - An accumulator function to be invoked on each element.
 * @param {Function} [resultSelector] - A function to transform the final accumulator value into the result value.
 * @returns {*} The transformed final accumulator value.
 */
Enumerable.prototype.aggregate = function (seed, func, resultSelector) {
	var enumerator = this.getEnumerator(),
		current, aggregation;

	// Check if seed parameter was omitted.
	if (LinqUtils.isFunction(seed)) {
		// If a second function was provided, it is the resultSelector.
		if (LinqUtils.isFunction(func)) {
			resultSelector = func;
		}

		func = seed;
		enumerator.moveNext();
		seed = enumerator.getCurrent();
	}

	aggregation = seed;

	while (enumerator.moveNext()) {
		current = enumerator.getCurrent();
		aggregation = func.call(current, aggregation, current);
	}

	if (LinqUtils.isFunction(resultSelector)) {
		aggregation = resultSelector.call(aggregation, aggregation);
	}

	return aggregation;
};
/**
 * @file Adds the all method to the Enumerable prototype.
 * @author Chips100
 */

/** Determines whether all elements of a sequence satisfy a condition.
 * @this Enumerable
 * @param {Function} predicate - A function to test each element for a condition.
 * @returns {Boolean} true if every element of the source sequence passes the test in the specified predicate, or if the sequence is empty; otherwise, false.
 */
Enumerable.prototype.all = function (predicate) {
	LinqAssert.requiredFunction(predicate, 'predicate');

	var enumerator = this.getEnumerator(),
		current;

	while (enumerator.moveNext()) {
		current = enumerator.getCurrent();

		if (!predicate.call(current, current)) {
			return false;
		}
	}

	return true;
};
/**
 * @file Adds the any method to the Enumerable prototype.
 * @author Chips100
 */

/** Determines whether any element of a sequence satisfies a condition.
 * @this Enumerable
 * @param {Function} [predicate] - A function to test each element for a condition. If omitted, this method determines if the sequence contains any elements.
 * @returns {Boolean} true if any elements in the source sequence pass the test in the specified predicate; otherwise, false.
 */
Enumerable.prototype.any = function (predicate) {
	var enumerator = this.getEnumerator(),
		current;

	if (!LinqUtils.isFunction(predicate)) {
		// If no predicate was provided, just check if there is at least one item.
		return enumerator.moveNext();
	}
	else {
		while (enumerator.moveNext()) {
			current = enumerator.getCurrent();

			if (predicate.call(current, current)) {
				return true;
			}
		}

		return false;
	}
};
/**
 * @file Adds the contains method to the Enumerable prototype.
 * @author Chips100
 */

/** Determines whether a sequence contains a specified element by using a specified comparer.
 * @this Enumerable
 * @param {*} value - The value to locate in the sequence.
 * @param {Function|EqualityComparer} [comparer] - An equality comparer to compare values. If ommited, equality is checked by strict equality.
 * @returns {Boolean} true if the source sequence contains an element that has the specified value; otherwise, false.
 */
Enumerable.prototype.contains = function (value, comparer) {
	comparer = LinqUtils.createEqualityComparer(comparer);

	var enumerator = this.getEnumerator(),
		current;

	while (enumerator.moveNext()) {
		current = enumerator.getCurrent();

		if (comparer.equals(current, value)) {
			return true;
		}
	}

	return false;
};
/**
 * @file Adds the count method to the Enumerable prototype.
 * @author Chips100
 */

/** Returns a number that represents how many elements in the specified sequence satisfy a condition.
 * @this Enumerable
 * @param {Function} [predicate] - A function to test each element for a condition. If omitted, all items are counted.
 * @returns {Number} A number that represents how many elements in the sequence satisfy the condition in the predicate function.
 */
Enumerable.prototype.count = function (predicate) {
	var counter = 0,
		current,
		enumerator = this.getEnumerator();

	while (enumerator.moveNext()) {
		current = enumerator.getCurrent();

		if (!LinqUtils.isFunction(predicate) || predicate.call(current, current)) {
			counter++;
		}
	}

	return counter;
};
/**
 * @file Adds the elementAt method to the Enumerable prototype.
 * @author Chips100
 */

/** Returns the element at a specified index in a sequence.
 * @this Enumerable 
 * @param {Number} index - The zero-based index of the element to retrieve.
 * @returns {*} The element at the specified position in the source sequence.
 */
Enumerable.prototype.elementAt = function (index) {
  LinqAssert.requiredPositiveNumber(index, 'index');

  var enumerator = this.getEnumerator(),
    iterator = 0;

  while (iterator <= index) {
    if (!enumerator.moveNext()) {
      LinqAssert.throwArgumentOutOfRangeError('index');
    }

    iterator++;
  }

  return enumerator.getCurrent();
};
/**
 * @file Adds the first method to the Enumerable prototype.
 * @author Chips100
 */

/** Returns the first element in a sequence that satisfies a specified condition.
 * @this Enumerable
 * @param {Function} [predicate] - A function to test each element for a condition. If omitted, the first item from the sequence is used.
 * @returns {*} The first element in the sequence that passes the test in the specified predicate function.
 */
Enumerable.prototype.first = function (predicate) {
	var enumerator = this.getEnumerator(),
		current;

	while (enumerator.moveNext()) {
		current = enumerator.getCurrent();

		if (!LinqUtils.isFunction(predicate) || predicate.call(current, current)) {
			return current;
		}
	}

	LinqAssert.throwNoMatchingItemError();
};
/**
 * @file Adds the firstOrDefault method to the Enumerable prototype.
 * @author Chips100
 */

/** Returns the first element of the sequence that satisfies a condition or a default value if no such element is found.
 * @this Enumerable
 * @param {Function} [predicate] - A function to test each element for a condition. If omitted, the first item from the sequence is used.
 * @returns {*} null if source is empty or if no element passes the test specified by predicate; otherwise, the first element in source that passes the test specified by predicate.
 */
Enumerable.prototype.firstOrDefault = function (predicate) {
	var enumerator = this.getEnumerator(),
		current;

	while (enumerator.moveNext()) {
		current = enumerator.getCurrent();

		if (!LinqUtils.isFunction(predicate) || predicate.call(current, current)) {
			return current;
		}
	}

	return null;
};
/**
 * @file Adds the last method to the Enumerable prototype.
 * @author Chips100
 */

/** Returns the last element in a sequence that satisfies a specified condition.
 * @this Enumerable
 * @param {Function} [predicate] - A function to test each element for a condition. If omitted, the last item from the sequence is used.
 * @returns {*} The last element in the sequence that passes the test in the specified predicate function.
 */
Enumerable.prototype.last = function (predicate) {
	var enumerator = this.getEnumerator(),
		current,
		lastMatchSet = false,
		lastMatch;

	// Here we could have a potential performance boost by iterating from last to first.
	// With the current implementation, we have to call the predicate for every element.
	// In LINQ.NET it is not optimized either.
	// Jon Skeet has an interesting possible reason - what if the predicate function for an element would throw an exception?
	// http://msmvps.com/blogs/jon_skeet/archive/2010/12/29/reimplementing-linq-to-objects-part-11-first-single-last-and-the-ordefault-versions.aspx
	while (enumerator.moveNext()) {
		current = enumerator.getCurrent();

		if (!LinqUtils.isFunction(predicate) || predicate.call(current, current)) {
			lastMatchSet = true;
			lastMatch = current;
		}
	}

	if (!lastMatchSet) {
		LinqAssert.throwNoMatchingItemError();
	}
	else {
		return lastMatch;
	}
};
/**
 * @file Adds the lastOrDefault method to the Enumerable prototype.
 * @author Chips100
 */

/** Returns the last element of the sequence that satisfies a condition or a default value if no such element is found.
 * @this Enumerable
 * @param {Function} [predicate] - A function to test each element for a condition. If omitted, the last item from the sequence is used.
 * @returns {*} null if source is empty or if no element passes the test specified by predicate; otherwise, the last element in source that passes the test specified by predicate.
 */
Enumerable.prototype.lastOrDefault = function (predicate) {
	var enumerator = this.getEnumerator(),
		current,
		lastMatchSet = false,
		lastMatch;

	// Here we could have a potential performance boost by iterating from last to first.
	// With the current implementation, we have to call the predicate for every element.
	// In LINQ.NET it is not optimized either.
	// Jon Skeet has an interesting possible reason - what if the predicate function for an element would throw an exception?
	// http://msmvps.com/blogs/jon_skeet/archive/2010/12/29/reimplementing-linq-to-objects-part-11-first-single-last-and-the-ordefault-versions.aspx
	while (enumerator.moveNext()) {
		current = enumerator.getCurrent();

		if (!LinqUtils.isFunction(predicate) || predicate.call(current, current)) {
			lastMatchSet = true;
			lastMatch = current;
		}
	}

	if (!lastMatchSet) {
		return null;
	}
	else {
		return lastMatch;
	}
};
/**
 * @file Adds the single method to the Enumerable prototype.
 * @author Chips100
 */

/** Returns the only element of a sequence that satisfies a specified condition, and throws an exception if more than one such element exists.
 * @this Enumerable
 * @param {Function} [predicate] - A function to test an element for a condition. If omitted, the only item is used.
 * @returns {*} The single element of the input sequence that satisfies a condition.
 */
Enumerable.prototype.single = function (predicate) {
	var enumerator = this.getEnumerator(),
		current,
		returnValueSet = false,
		returnValue;

	while (enumerator.moveNext()) {
		current = enumerator.getCurrent();
		if (!LinqUtils.isFunction(predicate) || predicate.call(current, current)) {
			if (!returnValueSet) {
				returnValueSet = true;
				returnValue = current;
			}
			else {
				LinqAssert.throwMultipleMatchingItemsError();
			}
		}
	}

	if (!returnValueSet) {
		LinqAssert.throwNoMatchingItemError();
	}
	else {
		return returnValue;
	}
};
/**
 * @file Adds the singleOrDefault method to the Enumerable prototype.
 * @author Chips100
 */

/** Returns the only element of a sequence, or a default value if the sequence is empty; this method throws an exception if there is more than one element in the sequence.
 * @this Enumerable
 * @param {Function} [predicate] - A function to test an element for a condition. If omitted, the only item is used.
 * @returns {*} The single element of the input sequence that satisfies the condition, or null if no such element is found.
 */
Enumerable.prototype.singleOrDefault = function (predicate) {
	var enumerator = this.getEnumerator(),
		current,
		returnValueSet = false,
		returnValue;

	while (enumerator.moveNext()) {
		current = enumerator.getCurrent();
		if (!LinqUtils.isFunction(predicate) || predicate.call(current, current)) {
			if (!returnValueSet) {
				returnValueSet = true;
				returnValue = current;
			}
			else {
				LinqAssert.throwMultipleMatchingItemsError();
			}
		}
	}

	if (!returnValueSet) {
		return null;
	}
	else {
		return returnValue;
	}
};
/**
 * @file Adds the toArray method to the Enumerable prototype.
 * @author Chips100
 */

/** Copies the elements of this sequence to a new array.
 * @this Enumerable
 * @returns {Array} An array containing copies of the elements of this sequence.
 */
Enumerable.prototype.toArray = function () {
	var result = [],
		enumerator = this.getEnumerator();

	while (enumerator.moveNext()) {
		result.push(enumerator.getCurrent());
	}

	return result;
};
/**
 * @file Adds the toLookup method to the Enumerable prototype.
 * @author Chips100
 */

/** Creates a lookup object from a sequence according to a specified key selector function and an element selector function.
 * @this Enumerable
 * @param {Function} keySelector - A function used to extract a key from each element.
 * @param {Function} [elementSelector] - A transform function to produce a result element value from each element.
 * @param {Function|EqualityComparer} [keyEqualityComparer] - Comparer used for comparing keys extracted from elements.
 * @returns {Lookup} A lookup object with the grouped elements.
 */
Enumerable.prototype.toLookup = function (keySelector, elementSelector, keyEqualityComparer) {
    return new Lookup(this, keySelector, elementSelector, keyEqualityComparer);
};
/**
 * @file Defines the Enumerable type.
 * @author Chips100
 */

/**
 * Base type for Enumerables.
 * @class
 */
function Enumerable() {}

/** Returns an Enumerator that iterates through a collection.
 * @this Enumerable
 * @abstract
 * @returns {Enumerator} An Enumerator that can be used to iterate through the collection.
 */
Enumerable.prototype.getEnumerator = function() {
	throw new Error('Not implemented: Enumerable does not support getEnumerator.');
};

/** Creates a new List with the items from this sequence.
 * @this Enumerable
 * @returns {List} A List with the items from this sequence.
 */
Enumerable.prototype.toList = function() {
	return new List(this);	
};


/**
 * @file Adds the concat method to the Enumerable prototype.
 * @author Chips100
 */

/** Concatenates the specified sequence to this sequence.
 * @this Enumerable
 * @param {Enumerable} second - The sequence to concatenate to this sequence.
 * @returns {Enumerable} An Enumerable that contains the concatenated elements of the two input sequences.
 */
Enumerable.prototype.concat = function (second) {
	return new ConcatEnumerable(this, second);
};

/** Represents an Enumerable created by a concat operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} first - The first sequence to concatenate.
 * @param {Enumerable} second - The sequence to concatenate to the first sequence.
 */
function ConcatEnumerable(first, second) {
	LinqAssert.requiredEnumerable(first, 'first');
	LinqAssert.requiredEnumerable(second, 'second');

	this._first = first;
	this._second = second;
}

// Put the Enumerable prototype into the prototype chain.
ConcatEnumerable.prototype = Object.create(Enumerable.prototype);

/** Returns an Enumerator that iterates through the current collection.
 * @this ConcatEnumerable
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
ConcatEnumerable.prototype.getEnumerator = function () {
	return new ConcatEnumerator(this._first, this._second);
};
/**
 * @file Defines the ConcatEnumerator used to iterate through collections created by a concat operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a concat operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} first - The first sequence to concatenate.
 * @param {Enumerable} second - The sequence to concatenate to the first sequence.
 */
function ConcatEnumerator(first, second) {
	this._firstEnumerator = first.getEnumerator();
	this._secondEnumerator = second.getEnumerator();

	this.reset();
}

/** Gets the current element in the collection.
 * @this ConcatEnumerator
 * @returns {*} The current element in the collection.
 */
ConcatEnumerator.prototype.getCurrent = function () {
	if (this._isFirstActive) {
		return this._firstEnumerator.getCurrent();
	}
	else {
		return this._secondEnumerator.getCurrent();
	}
};

/** Advances the enumerator to the next element of the collection.
 * @this ConcatEnumerator
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
ConcatEnumerator.prototype.moveNext = function () {
	if (this._isFirstActive) {
		if (this._firstEnumerator.moveNext()) {
			return true;
		}
		else {
			this._isFirstActive = false;
			return this.moveNext();
		}
	}
	else {
		return this._secondEnumerator.moveNext();
	}
};

/** Sets the enumerator to its initial position, which is before the first element in the collection. 
 * @this ConcatEnumerator
 */
ConcatEnumerator.prototype.reset = function () {
	this._secondEnumerator.reset();
	this._firstEnumerator.reset();
	this._isFirstActive = true;
};

/**
 * @file Adds the defaultIfEmpty method to the Enumerable prototype.
 * @author Chips100
 */

/** Returns the elements of the specified sequence or the specified value in a singleton collection if the sequence is empty.
 * @this Enumerable
 * @param {*} defaultValue - The value to return if the sequence is empty.
 * @returns {Enumerable} An Enumerable that contains defaultValue if the current sequence is empty; otherwise, the current sequence.
 */
Enumerable.prototype.defaultIfEmpty = function (defaultValue) {
	return new DefaultIfEmptyEnumerable(this, defaultValue);
};

/**
 * Represents an Enumerable created by a defaultIfEmpty operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} source - The sequence to return the specified value for if it is empty.
 * @param {*} defaultValue - The value to return if the sequence is empty.
 */
function DefaultIfEmptyEnumerable(source, defaultValue) {
	LinqAssert.requiredEnumerable(source, 'source');

	this._source = source;
	this._defaultValue = defaultValue;
}

// Put the Enumerable prototype into the prototype chain.
DefaultIfEmptyEnumerable.prototype = Object.create(Enumerable.prototype);

/** Returns an Enumerator that iterates through the current collection.
 * @this DefaultIfEmptyEnumerable
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
DefaultIfEmptyEnumerable.prototype.getEnumerator = function () {
	return new DefaultIfEmptyEnumerator(this._source, this._defaultValue);
};
/**
 * @file Defines the DefaultIfEmptyEnumerator used to iterate through collections created by a defaultIfEmpty operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a defaultIfEmpty operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} source - The sequence to return the specified value for if it is empty.
 * @param {*} defaultValue - The value to return if the sequence is empty.
 */
function DefaultIfEmptyEnumerator(source, defaultValue) {
	this._enumerator = source.getEnumerator();
	this._defaultValue = defaultValue;
}

/** Gets the current element in the collection.
 * @this DefaultIfEmptyEnumerator
 * @returns {*} The current element in the collection.
 */
DefaultIfEmptyEnumerator.prototype.getCurrent = function () {
	if (this._useSource) {
		return this._enumerator.getCurrent();
	}
	else {
		return this._defaultValue;
	}
};

/** Advances the enumerator to the next element of the collection.
 * @this DefaultIfEmptyEnumerator
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
DefaultIfEmptyEnumerator.prototype.moveNext = function () {
	if (!this._useSource && !this._useDefault) {
		this._useSource = this._enumerator.moveNext();
		this._useDefault = !this._useSource;
		return true;
	}
	else if (this._useSource) {
		return this._enumerator.moveNext();
	}
	else if (this._useDefault) {
		return false;
	}
};

/** Sets the enumerator to its initial position, which is before the first element in the collection.
 * @this DefaultIfEmptyEnumerator
 */
DefaultIfEmptyEnumerator.prototype.reset = function () {
	this._useSource = false;
	this._useDefault = false;
	this._enumerator.reset();
};

/**
 * @file Adds the distinct method to the Enumerable prototype.
 * @author Chips100
 */

/** Returns distinct elements from a sequence by using a specified comparer to compare values.
 * @this Enumerable
 * @param {Function|EqualityComparer} comparer - A function or an EqualityComparer to compare values for equality.
 * @returns {Enumerable} An Enumerable that contains distinct elements from the source sequence.
 */
Enumerable.prototype.distinct = function (comparer) {
	return new DistinctEnumerable(this, comparer);
};

/**
 * Represents an Enumerable created by a distinct operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} source - The sequence to remove duplicate elements from.
 * @param {Function|EqualityComparer} comparer - A function or an EqualityComparer to compare values for equality.
 */
function DistinctEnumerable(source, comparer) {
	LinqAssert.requiredEnumerable(source, 'source');

	this._source = source;
	this._comparer = LinqUtils.createEqualityComparer(comparer);
}

// Put the Enumerable prototype into the prototype chain.
DistinctEnumerable.prototype = Object.create(Enumerable.prototype);

/** Returns an Enumerator that iterates through the current collection.
 * @this DistinctEnumerable
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
DistinctEnumerable.prototype.getEnumerator = function () {
	return new DistinctEnumerator(this._source, this._comparer);
};
/**
 * @file Defines the DistinctEnumerator used to iterate through collections created by a distinct operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a distinct operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} source - The sequence to remove duplicate elements from.
 * @param {Function|EqualityComparer} comparer - A function or an EqualityComparer to compare values for equality.
 */
function DistinctEnumerator(source, comparer) {
	this._enumerator = source.getEnumerator();
	this._comparer = comparer;

	this.reset();
}

/** Gets the current element in the collection.
 * @this DistinctEnumerator
 * @returns {*} The current element in the collection.
 */
DistinctEnumerator.prototype.getCurrent = function () {
	return this._enumerator.getCurrent();
};

/** Advances the enumerator to the next element of the collection.
 * @this DistinctEnumerator
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
DistinctEnumerator.prototype.moveNext = function () {
	var current,
		currentHash,
		possibleDuplicate;

	if (this._enumerator.moveNext()) {
		current = this._enumerator.getCurrent();
		currentHash = this._comparer.getHashCode(current);

		if (!this._seenElements[currentHash]) {
			this._seenElements[currentHash] = [current];
			return true;
		}
		else {
			for (var i = this._seenElements[currentHash].length - 1; i >= 0; i--) {
				if (this._comparer.equals(current, this._seenElements[currentHash][i])) {
					return this.moveNext();
				}
			}

			this._seenElements[currentHash].push(current);
			return true;
		}
	}
	else {
		return false;
	}
};

/** Sets the enumerator to its initial position, which is before the first element in the collection.
 * @this DistinctEnumerator
 */
DistinctEnumerator.prototype.reset = function () {
	this._seenElements = {};
	this._enumerator.reset();
};

/**
 * @file Adds the static empty method to the Enumerable type.
 * @author Chips100
 */

/** Returns an empty sequence.
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

/**
 * @file Adds the except method to the Enumerable prototype.
 * @author Chips100
 */

/** Produces the set difference of two sequences by using the specified comparer to compare values.
 * @this Enumerable
 * @param {Enumerable} second - An Enumerable whose elements that also occur in the first sequence will cause those elements to be removed from the returned sequence.
 * @param {Function|EqualityComparer} comparer - A function or an EqualityComparer to compare values for equality.
 * @returns {Enumerable} A sequence that contains the set difference of the elements of two sequences.
 */
Enumerable.prototype.except = function (second, comparer) {
	return new ExceptEnumerable(this, second, comparer);
};

/**
 * Represents an Enumerable created by an except operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} first - An Enumerable whose elements that are not also in second will be returned.
 * @param {Enumerable} second - An Enumerable whose elements that also occur in the first sequence will cause those elements to be removed from the returned sequence.
 * @param {Function|EqualityComparer} comparer - A function or an EqualityComparer to compare values for equality.
 */
function ExceptEnumerable(first, second, comparer) {
	LinqAssert.requiredEnumerable(first, 'first');
	LinqAssert.requiredEnumerable(second, 'second');

	this._first = first;
	this._second = second;
	this._comparer = LinqUtils.createEqualityComparer(comparer);
}

// Put the Enumerable prototype into the prototype chain.
ExceptEnumerable.prototype = Object.create(Enumerable);

/** Returns an Enumerator that iterates through the current collection.
 * @this ExceptEnumerable
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
ExceptEnumerable.prototype.getEnumerator = function () {
	return new ExceptEnumerator(this._first, this._second, this._comparer);
};
/**
 * @file Defines the ExceptEnumerator used to iterate through collections created by an except operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by an except operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} first - An Enumerable whose elements that are not also in second will be returned.
 * @param {Enumerable} second - An Enumerable whose elements that also occur in the first sequence will cause those elements to be removed from the returned sequence.
 * @param {Function|EqualityComparer} comparer - A function or an EqualityComparer to compare values for equality.
 */
function ExceptEnumerator(first, second, comparer) {
	this._firstEnumerator = first.getEnumerator();
	this._secondEnumerator = second.getEnumerator();
	this._comparer = comparer;

	this.reset();
}

/** Gets the current element in the collection.
 * @this ExceptEnumerator
 * @returns {*} The current element in the collection.
 */
ExceptEnumerator.prototype.getCurrent = function () {
	return this._firstEnumerator.getCurrent();
};

/** Advances the enumerator to the next element of the collection.
 * @this ExceptEnumerator
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
ExceptEnumerator.prototype.moveNext = function () {
	var current,
		currentHash;

	if (!this._hasScannedSecond) {
		while (this._secondEnumerator.moveNext()) {
			current = this._secondEnumerator.getCurrent();
			currentHash = this._comparer.getHashCode(current);

			if (!this._bannedElements[currentHash]) {
				this._bannedElements[currentHash] = [current];
			}
			else {
				this._bannedElements[currentHash].push(current);
			}
		}

		this._hasScannedSecond = true;
	}

	if (this._firstEnumerator.moveNext()) {
		current = this._firstEnumerator.getCurrent();
		currentHash = this._comparer.getHashCode(current);

		if (!this._bannedElements[currentHash]) {
			this._bannedElements[currentHash] = [current];
			return true;
		}
		else {
			for (var i = this._bannedElements[currentHash].length - 1; i >= 0; i--) {
				if (this._comparer.equals(current, this._bannedElements[currentHash][i])) {
					return this.moveNext();
				}
			}

			this._bannedElements[currentHash].push(current);
			return true;
		}
	}
	else {
		return false;
	}
};

/** Sets the enumerator to its initial position, which is before the first element in the collection.
 * @this ExceptEnumerator
 */
ExceptEnumerator.prototype.reset = function () {
	this._firstEnumerator.reset();
	this._secondEnumerator.reset();
	this._hasScannedSecond = false;
	this._bannedElements = {};
};

/**
 * @file Adds the intersect method to the Enumerable prototype.
 * @author Chips100
 */

/** Produces the set intersection of two sequences by using the specified comparer to compare values.
 * @this Enumerable
 * @param {Enumerable} second - An Enumerable whose distinct elements that also appear in the first sequence will be returned.
 * @param {Function|EqualityComparer} comparer - A function or an EqualityComparer to compare values for equality.
 * @returns {Enumerable} A sequence that contains the elements that form the set intersection of two sequences.
 */
Enumerable.prototype.intersect = function (second, comparer) {
	return new IntersectEnumerable(this, second, comparer);
};

/**
 * Represents an Enumerable created by an intersect operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} first - An Enumerable whose distinct elements that also appear in second will be returned.
 * @param {Enumerable} second - An Enumerable whose distinct elements that also appear in the first sequence will be returned.
 * @param {Function|EqualityComparer} comparer - A function or an EqualityComparer to compare values for equality.
 */
function IntersectEnumerable(first, second, comparer) {
	LinqAssert.requiredEnumerable(first, 'first');
	LinqAssert.requiredEnumerable(second, 'second');

	this._first = first;
	this._second = second;
	this._comparer = LinqUtils.createEqualityComparer(comparer);
}

// Put the Enumerable prototype into the prototype chain.
IntersectEnumerable.prototype = Object.create(Enumerable.prototype);

/** Returns an Enumerator that iterates through the current collection.
 * @this IntersectEnumerable
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
IntersectEnumerable.prototype.getEnumerator = function () {
	return new IntersectEnumerator(this._first, this._second, this._comparer);
};
/**
 * @file Defines the IntersectEnumerator used to iterate through collections created by an intersect operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by an intersect operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} first - An Enumerable whose distinct elements that also appear in second will be returned.
 * @param {Enumerable} second -  An Enumerable whose distinct elements that also appear in the first sequence will be returned.
 * @param {Function|EqualityComparer} comparer - A function or an EqualityComparer to compare values for equality.
 */
function IntersectEnumerator(first, second, comparer) {
	this._firstEnumerator = first.getEnumerator();
	this._secondEnumerator = second.getEnumerator();
	this._comparer = comparer;

	this.reset();
}

/** Gets the current element in the collection.
 * @this IntersectEnumerator
 * @returns {*} The current element in the collection.
 */
IntersectEnumerator.prototype.getCurrent = function () {
	return this._firstEnumerator.getCurrent();
};

/** Advances the enumerator to the next element of the collection.
 * @this IntersectEnumerator
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
IntersectEnumerator.prototype.moveNext = function () {
	var current,
		currentHash;

	// Iterate over the second sequence first to collect all values for finding intersections.
	if (!this._hasScannedSecond) {
		while (this._secondEnumerator.moveNext()) {
			current = this._secondEnumerator.getCurrent();
			currentHash = this._comparer.getHashCode(current);

			if (!this._seenElements[currentHash]) {
				this._seenElements[currentHash] = [current];
			}
			else {
				this._seenElements[currentHash].push(current);
			}
		}

		this._hasScannedSecond = true;
	}

	// Move next on the source sequence and check if there is an intersection in the second sequence.
	if (this._firstEnumerator.moveNext()) {
		current = this._firstEnumerator.getCurrent();
		currentHash = this._comparer.getHashCode(current);

		if (!this._seenElements[currentHash]) {
			// No element with the same hash, try the next one.
			return this.moveNext();
		}
		else {
			for (var i = this._seenElements[currentHash].length - 1; i >= 0; i--) {
				if (this._comparer.equals(current, this._seenElements[currentHash][i])) {

					// At this point we are willing to yield the element, because we found it in second sequence as well.
					// We have to make sure that this element has not been yielded before.
					if (!this._yieldedElements[currentHash]) {
						this._yieldedElements[currentHash] = [current];
						return true;
					}
					else {
						// The method is definitly going to exit in this iteration, so we can reuse the iterator variables.
						for (i = this._yieldedElements[currentHash].length - 1; i >= 0; i--) {
							if (this._comparer.equals(current, this._yieldedElements[currentHash][i])) {
								// Already yielded the found item, try the next one.
								return this.moveNext();
							}
						}

						// Remember that this item has been yielded to not yield it again.
						this._yieldedElements[currentHash].push(current);
						return true;
					}
				}
			}

			return this.moveNext();
		}
	}
	else {
		return false;
	}
};

/** Sets the enumerator to its initial position, which is before the first element in the collection.
 * @this IntersectEnumerator
 */
IntersectEnumerator.prototype.reset = function () {
	this._firstEnumerator.reset();
	this._secondEnumerator.reset();
	this._hasScannedSecond = false;
	this._seenElements = {};
	this._yieldedElements = {};
};

/**
 * @file Adds the join method to the Enumerable prototype.
 * @author Chips100
 */

/** Correlates the elements of two sequences based on matching keys. An EqualityComparer can be specified to be used to compare keys.
 * @this Enumerable
 * @param {Enumerable} inner - The sequence to join to the first sequence.
 * @param {Function} outerKeySelector - A function to extract the join key from each element of the first sequence.
 * @param {Function} innerKeySelector - A function to extract the join key from each element of the second sequence.
 * @param {Function} resultSelector - A function to create a result element from two matching elements.
 * @param {Function|EqualityComparer} keyEqualityComparer - A function or an EqualityComparer to compare keys for equality.
 * @returns {Enumerable} A sequence that has elements that are obtained by performing an inner join on two sequences.
 */
Enumerable.prototype.join = function (inner, outerKeySelector, innerKeySelector, resultSelector, keyEqualityComparer) {
	return new JoinEnumerable(this, inner, outerKeySelector, innerKeySelector, resultSelector, keyEqualityComparer);
};

/**
 * Represents an Enumerable created by a join operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} outer - The first sequence to join.
 * @param {Enumerable} inner - The sequence to join to the first sequence.
 * @param {Function} outerKeySelector - A function to extract the join key from each element of the first sequence.
 * @param {Function} innerKeySelector - A function to extract the join key from each element of the second sequence.
 * @param {Function} resultSelector - A function to create a result element from two matching elements.
 * @param {Function|EqualityComparer} keyEqualityComparer - A function or an EqualityComparer to compare keys for equality.
 */
function JoinEnumerable(outer, inner, outerKeySelector, innerKeySelector, resultSelector, keyEqualityComparer) {
	LinqAssert.requiredEnumerable(outer, 'outer');
	LinqAssert.requiredEnumerable(inner, 'inner');
	LinqAssert.requiredFunction(outerKeySelector, 'outerKeySelector');
	LinqAssert.requiredFunction(innerKeySelector, 'innerKeySelector');
	LinqAssert.requiredFunction(resultSelector, 'resultSelector');

    this._outer = outer;
    this._inner = inner;
    this._outerKeySelector = outerKeySelector;
    this._innerKeySelector = innerKeySelector;
    this._resultSelector = resultSelector;
    this._keyEqualityComparer = LinqUtils.createEqualityComparer(keyEqualityComparer);
}

// Put the Enumerable prototype into the prototype chain.
JoinEnumerable.prototype = Object.create(Enumerable.prototype);

/** Returns an Enumerator that iterates through the current collection.
 * @this IntersectEnumerable
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
JoinEnumerable.prototype.getEnumerator = function () {
	return new JoinEnumerator(this._outer, this._inner, this._outerKeySelector, this._innerKeySelector, this._resultSelector, this._keyEqualityComparer);
};
/**
 * @file Defines the JoinEnumerator used to iterate through collections created by a join operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a join operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} outer - The first sequence to join.
 * @param {Enumerable} inner - The sequence to join to the first sequence.
 * @param {Function} outerKeySelector - A function to extract the join key from each element of the first sequence.
 * @param {Function} innerKeySelector - A function to extract the join key from each element of the second sequence.
 * @param {Function} resultSelector - A function to create a result element from two matching elements.
 * @param {Function|EqualityComparer} keyEqualityComparer - A function or an EqualityComparer to compare keys for equality.
 */
function JoinEnumerator(outer, inner, outerKeySelector, innerKeySelector, resultSelector, keyEqualityComparer) {
	this._outerEnumerator = outer.getEnumerator();
	this._innerEnumerable = inner;
	this._outerKeySelector = outerKeySelector;
	this._innerKeySelector = innerKeySelector;
	this._resultSelector = resultSelector;
	this._keyEqualityComparer = keyEqualityComparer;

	this.reset();
}

/** Gets the current element in the collection.
 * @this JoinEnumerator
 * @returns {*} The current element in the collection.
 */
JoinEnumerator.prototype.getCurrent = function () {
	return this._resultSelector(this._currentOuter, this._currentInnerEnumerator.getCurrent());
};

/** Advances the enumerator to the next element of the collection.
 * @this JoinEnumerator
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
JoinEnumerator.prototype.moveNext = function () {
	if (!this._hasScannedInner) {
		this._hasScannedInner = true;
		this._innerLookup = this._innerEnumerable.toLookup(this._innerKeySelector, undefined, this._keyEqualityComparer);		
	}

	if (this._currentInnerEnumerator && this._currentInnerEnumerator.moveNext()) {
		return true;
	}
	else {
		if (!this._outerEnumerator.moveNext()) {
			return false;
		}
		else {
			this._currentOuter = this._outerEnumerator.getCurrent();
			this._currentInnerEnumerator = this._innerLookup.get(this._outerKeySelector(this._currentOuter)).getEnumerator();
			return this.moveNext();
		}
	}
};

/** Sets the enumerator to its initial position, which is before the first element in the collection.
 * @this JoinEnumerator
 */
JoinEnumerator.prototype.reset = function () {
	this._outerEnumerator.reset();
	this._hasScannedInner = false;
	this._currentInnerEnumerator = undefined;
	this._currentOuter = undefined;
};

/**
 * @file Adds the static range method to the Enumerable type.
 * @author Chips100
 */

/** 
 * Generates a sequence of integral numbers within a specified range.
 * @param {Number} start - The value of the first integer in the sequence.
 * @param {Number} count - The number of sequential integers to generate.
 * @returns {Enumerable} An Enumerable that contains a range of sequential integral numbers.
 */
Enumerable.range = function (start, count) {
	return new RangeEnumerable(start, count);
};

/**
 * Represents an Enumerable created by a range operation.
 * @class
 * @augments Enumerable
 * @param {Number} start - The value of the first integer in the sequence.
 * @param {Number} count - The number of sequential integers to generate.
 */
function RangeEnumerable(start, count) {
	LinqAssert.requiredNumber(start, 'start');
	LinqAssert.requiredPositiveNumber(count, 'count');

	this._start = +start;
	this._count = +count;
}

// Put the Enumerable prototype into the prototype chain.
RangeEnumerable.prototype = Object.create(Enumerable.prototype);

/** Returns an Enumerator that iterates through the current collection.
 * @this RangeEnumerable
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
RangeEnumerable.prototype.getEnumerator = function () {
	return new RangeEnumerator(this._start, this._count);
};
/**
 * @file Defines the RangeEnumerator used to iterate through collections created by a range operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a range operation.
 * @class
 * @augments Enumerator
 * @param {Number} start - The value of the first integer in the sequence.
 * @param {Number} count - The number of sequential integers to generate.
 */
function RangeEnumerator(start, count) {
	this._start = start;
	this._end = start + count;
	
	this.reset();
}

/** Gets the current element in the collection.
 * @this RangeEnumerator
 * @returns {*} The current element in the collection.
 */
RangeEnumerator.prototype.getCurrent = function() {
	if (this._index <= this._start || this._index > this._end ) {
		throw new Error('invalid cursor position');
	}
	
	return this._index - 1;
};

/** Advances the enumerator to the next element of the collection.
 * @this RangeEnumerator
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
RangeEnumerator.prototype.moveNext = function() {
	return this._index++ < this._end;
};

/** Sets the enumerator to its initial position, which is before the first element in the collection.
 * @this RangeEnumerator
 */
RangeEnumerator.prototype.reset = function() {
	this._index = this._start;
};


/**
 * @file Adds the static repeat method to the Enumerable type.
 * @author Chips100
 */

/**
 * Generates a sequence that contains one repeated value.
 * @param {*} element - The value to be repeated.
 * @param {Number} count - The number of times to repeat the value in the generated sequence.
 * @returns {Enumerable} An Enumerable that contains a repeated value.
 */
Enumerable.repeat = function(element, count) {
	return new RepeatEnumerable(element, count);
};

/**
 * Represents an Enumerable created by a repeat operation.
 * @class
 * @augments Enumerable
 * @param {*} element - The value to be repeated.
 * @param {Number} count - The number of times to repeat the value in the generated sequence.
 */
function RepeatEnumerable(element, count) {
	LinqAssert.requiredPositiveNumber(count, 'count');
	
	this._element = element;
	this._count = count;
}

// Put the Enumerable prototype into the prototype chain.
RepeatEnumerable.prototype = Object.create(Enumerable.prototype);

/** Returns an Enumerator that iterates through the current collection.
 * @this RepeatEnumerable
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
RepeatEnumerable.prototype.getEnumerator = function() {
	return new RepeatEnumerator(this._element, this._count);
};
/**
 * @file Defines the RepeatEnumerator used to iterate through collections created by a repeat operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a repeat operation.
 * @class
 * @augments Enumerator
 * @param {*} element - The value to be repeated.
 * @param {Number} count - The number of times to repeat the value in the generated sequence.
 */
function RepeatEnumerator(element, count) {
	this._element = element;
	this._count = count;
	
	this.reset();
}

/** Gets the current element in the collection.
 * @this RepeatEnumerator
 * @returns {*} The current element in the collection.
 */
RepeatEnumerator.prototype.getCurrent = function() {
	if (this._index >= 0 && this._index < this._count) {
		return this._element;
	}
	else {
		throw new Error('Tried to call getCurrent() on invalid cursor position.');
	}
}

/** Advances the enumerator to the next element of the collection.
 * @this RepeatEnumerator
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
RepeatEnumerator.prototype.moveNext = function() {
	return ++this._index < this._count;
};

/** Sets the enumerator to its initial position, which is before the first element in the collection.
 * @this RepeatEnumerator
 */
RepeatEnumerator.prototype.reset = function() {
	this._index = -1;
};

/**
 * @file Adds the select method to the Enumerable prototype.
 * @author Chips100
 */

/** Projects each element of a sequence into a new form.
 * @this Enumerable
 * @param {Function} selector - A transform function to apply to each element.
 * @returns {Enumerable} An Enumerable whose elements are the result of invoking the transform function on each element of the current sequence.
 */
Enumerable.prototype.select = function(selector) {
	return new SelectEnumerable(this, selector);
};

/**
 * Represents an Enumerable created by a select operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} source - A sequence of values to invoke a transform function on.
 * @param {Function} selector - A transform function to apply to each element.
 */
function SelectEnumerable(source, selector) {
	LinqAssert.requiredEnumerable(source, 'source');
	LinqAssert.requiredFunction(selector, 'selector');
	
	this._source = source;
	this._selector = selector;
}

// Put the Enumerable prototype into the prototype chain.
SelectEnumerable.prototype = Object.create(Enumerable.prototype);

/** Returns an Enumerator that iterates through the current collection.
 * @this SelectEnumerable
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
SelectEnumerable.prototype.getEnumerator = function() {
	return new SelectEnumerator(this._source, this._selector);
};
/**
 * @file Defines the ConcatEnumerator used to iterate through collections created by a select operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a select operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} source - A sequence of values to invoke a transform function on.
 * @param {Function} selector - A transform function to apply to each element.
 */
function SelectEnumerator(source, selector) {
	this._enumerator = source.getEnumerator();
	this._selector = selector;
	this.reset();
}

/** Gets the current element in the collection.
 * @this SelectEnumerator
 * @returns {*} The current element in the collection.
 */
SelectEnumerator.prototype.getCurrent = function() {
	var current = this._enumerator.getCurrent();
	return this._selector.call(current, current, this._index);
};

/** Advances the enumerator to the next element of the collection.
 * @this SelectEnumerator
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
SelectEnumerator.prototype.moveNext = function() {
	this._index++;
	return this._enumerator.moveNext();
};

/** Sets the enumerator to its initial position, which is before the first element in the collection.
 * @this SelectEnumerator
 */
SelectEnumerator.prototype.reset = function() {
	this._enumerator.reset();
	this._index = -1;
};

/**
 * @file Adds the selectMany method to the Enumerable prototype.
 * @author Chips100
 */

/** Projects each element of a sequence to an Enumerable, flattens the resulting sequences into one sequence, 
 * and invokes a result selector function on each element therein. 
 * The index of each source element can be used in the intermediate projected form of that element.
 * @this Enumerable 
 * @param {Function} collectionSelector - A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
 * @param {Function} [resultSelector] - An optional transform function to apply to each element of the intermediate sequence.
 * @returns {Enumerable} An Enumerable whose elements are the result of invoking the one-to-many transform function collectionSelector 
 * on each element of source and then mapping each of those sequence elements and their corresponding source element to a result element.
 */
Enumerable.prototype.selectMany = function(collectionSelector, resultSelector) {
	return new SelectManyEnumerable(this, collectionSelector, resultSelector);
};

/**
 * Represents an Enumerable created by a selectMany operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} source - A sequence of values to project.
 * @param {Function} collectionSelector - A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
 * @param {Function} [resultSelector] - An optional transform function to apply to each element of the intermediate sequence.
 */
function SelectManyEnumerable(source, collectionSelector, resultSelector) {
	LinqAssert.requiredEnumerable(source, 'source');
	LinqAssert.requiredFunction(collectionSelector, 'collectionSelector');
	
	this._source = source;
	this._collectionSelector = collectionSelector;
	this._resultSelector = resultSelector;
}

// Put the Enumerable prototype into the prototype chain.
SelectManyEnumerable.prototype = Object.create(Enumerable.prototype);

/** Returns an Enumerator that iterates through the current collection.
 * @this SelectManyEnumerable
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
SelectManyEnumerable.prototype.getEnumerator = function() {
	return new SelectManyEnumerator(this._source, this._collectionSelector, this._resultSelector);
};


/**
 * @file Defines the SelectManyEnumerator used to iterate through collections created by a selectMany operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a selectMany operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} source - A sequence of values to project.
 * @param {Function} collectionSelector - A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
 * @param {Function} [resultSelector] - An optional transform function to apply to each element of the intermediate sequence.
 */
function SelectManyEnumerator(source, collectionSelector, resultSelector) {
	this._enumerator = source.getEnumerator();
	this._collectionSelector = collectionSelector;
	this._resultSelector = resultSelector;
	
	this.reset();
}

/** Gets the current element in the collection.
 * @this SelectManyEnumerator
 * @returns {*} The current element in the collection.
 */
SelectManyEnumerator.prototype.getCurrent = function() {
	var current = this._currentEnumerator.getCurrent();
	
	if (LinqUtils.isFunction(this._resultSelector)) {
		return this._resultSelector.call(this._currentElement, this._currentElement, current);
	}
	else {
		return current;
	}
};

/** Advances the enumerator to the next element of the collection.
 * @this SelectManyEnumerator
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
SelectManyEnumerator.prototype.moveNext = function() {
	var currentCollection;
	
	if (this._currentEnumerator && this._currentEnumerator.moveNext()) {
		return true;
	}
	else {
		this._index++;
		
		if (!this._enumerator.moveNext()) {
			// No more elements in original enumeration left.
			return false;
		}
		else {
			this._currentElement = this._enumerator.getCurrent();
			currentCollection = this._collectionSelector.call(this._currentElement, this._currentElement, this._index);
			
			if (!(currentCollection instanceof Enumerable)) {
				currentCollection = new List(currentCollection);
			}
			
			this._currentEnumerator = currentCollection.getEnumerator();
			
			if (this._currentEnumerator.moveNext()) {
				return true;
			}
			else {
				// This collection of original enumeration element contains no elements.
				// So we try to move to the next original enumeration element by calling this.moveNext.
				return this.moveNext();
			}
		}
	}
};

/** Sets the enumerator to its initial position, which is before the first element in the collection.
 * @this SelectManyEnumerator
 */
SelectManyEnumerator.prototype.reset = function() {
	this._enumerator.reset();
	this._index = -1;
	this._currentElement = undefined;
	this._currentEnumerator = undefined;
};

/**
 * @file Adds the skip method to the Enumerable prototype.
 * @author Chips100
 */

/** Bypasses a specified number of elements in a sequence and then returns the remaining elements.
 * @this Enumerable
 * @param {Number} count - The number of elements to skip before returning the remaining elements.
 * @returns {Enumerable} An Enumerable that contains the elements that occur after the specified index in the input sequence.
 */
Enumerable.prototype.skip = function(count) {
	return new SkipEnumerable(this, count);
};

/**
 * Represents an Enumerable created by a skip operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} source - An Enumerable to return elements from.
 * @param {Number} count - The number of elements to skip before returning the remaining elements.
 */
function SkipEnumerable(source, count) {
	LinqAssert.requiredEnumerable(source, 'source');
	LinqAssert.requiredNumber(count, 'count');
	
	this._source = source;
	this._count = count;
}

// Put the Enumerable prototype into the prototype chain.
SkipEnumerable.prototype = Object.create(Enumerable.prototype);

/** Returns an Enumerator that iterates through the current collection.
 * @this SkipEnumerable
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
SkipEnumerable.prototype.getEnumerator = function() {
	return new SkipEnumerator(this._source, this._count);
};
/**
 * @file Defines the SkipEnumerator used to iterate through collections created by a skip operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a skip operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} source - An Enumerable to return elements from.
 * @param {Number} count - The number of elements to skip before returning the remaining elements.
 */
function SkipEnumerator(source, number) {
	this._enumerator = source.getEnumerator();
	this._number = number;
	this.reset();
}

/** Gets the current element in the collection.
 * @this SkipEnumerator
 * @returns {*} The current element in the collection.
 */
SkipEnumerator.prototype.getCurrent = function() {
	return this._enumerator.getCurrent();
};

/** Advances the enumerator to the next element of the collection.
 * @this SkipEnumerator
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
SkipEnumerator.prototype.moveNext = function() {
	if (!this._hasSkippedFirstElements) {
		this._hasSkippedFirstElements = true;
		for (var i = this._number; i > 0; i--) {
			this._enumerator.moveNext();
		}
	}
	
	return this._enumerator.moveNext();
};

/** Sets the enumerator to its initial position, which is before the first element in the collection.
 * @this SkipEnumerator
 */
SkipEnumerator.prototype.reset = function() {
	this._enumerator.reset();
	this._hasSkippedFirstElements = false;
};

/**
 * @file Adds the skipWhile method to the Enumerable prototype.
 * @author Chips100
 */

/** Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
 * The element's index can be  used in the logic of the predicate function.
 * @this Enumerable 
 * @param {Function} predicate - A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
 * @returns {Enumerable} An Enumerable that contains the elements from the input sequence starting at the first element in the linear series that does not pass the test specified by predicate.
 */
Enumerable.prototype.skipWhile = function(predicate) {
	return new SkipWhileEnumerable(this, predicate);
};

/**
 * Represents an Enumerable created by a skipWhile operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} source - An Enumerable to return elements from.
 * @param {Function} predicate - A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
 */
function SkipWhileEnumerable(source, predicate) {
	LinqAssert.requiredEnumerable(source, 'source');
	LinqAssert.requiredFunction(predicate, 'predicate');
	
	this._source = source;
	this._predicate = predicate;
}

// Put the Enumerable prototype into the prototype chain.
SkipWhileEnumerable.prototype = Object.create(Enumerable.prototype);

/** Returns an Enumerator that iterates through the current collection.
 * @this SkipWhileEnumerable
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
SkipWhileEnumerable.prototype.getEnumerator = function() {
	return new SkipWhileEnumerator(this._source, this._predicate);
};
/**
 * @file Defines the SkipWhileEnumerator used to iterate through collections created by a skipWhile operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a skipWhile operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} source - An Enumerable to return elements from.
 * @param {Function} predicate - A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
 */
function SkipWhileEnumerator(source, predicate) {
	this._enumerator = source.getEnumerator();
	this._predicate = predicate;
	this.reset();
}

/** Gets the current element in the collection.
 * @this SkipWhileEnumerator
 * @returns {*} The current element in the collection.
 */
SkipWhileEnumerator.prototype.getCurrent = function() {
	return this._enumerator.getCurrent();
};

/** Advances the enumerator to the next element of the collection.
 * @this SkipWhileEnumerator
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
SkipWhileEnumerator.prototype.moveNext = function() {
	var current;
	
	if (!this._hasSkippedFirstElements) {
		this._hasSkippedFirstElements = true;
		
		while(this._enumerator.moveNext()) {
			this._index++;
			current = this._enumerator.getCurrent();
			if (!this._predicate.call(current, current, this._index)) {
				return true;
			}
		}
		
		return false;
	}
	else {
		return this._enumerator.moveNext();
	}
};

/** Sets the enumerator to its initial position, which is before the first element in the collection.
 * @this SkipWhileEnumerator
 */
SkipWhileEnumerator.prototype.reset = function() {
	this._enumerator.reset();
	this._hasSkippedFirstElements = false;
	this._index = -1;
};

/**
 * @file Adds the take method to the Enumerable prototype.
 * @author Chips100
 */

/** Returns a specified number of contiguous elements from the start of a sequence.
 * @this Enumerable
 * @param {Number} count - The number of elements to return.
 * @returns {Enumerable} An Enumerable that contains the specified number of elements from the start of the input sequence.
 */
Enumerable.prototype.take = function(count) {
	return new TakeEnumerable(this, count);
};

/**
 * Represents an Enumerable created by a take operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} source - The sequence to return elements from.
 * @param {Number} count - The number of elements to return.
 */
function TakeEnumerable(source, count) {
	LinqAssert.requiredEnumerable(source, 'source');
	LinqAssert.requiredNumber(count, 'count');
	
	this._source = source;
	this._count = count;
}

// Put the Enumerable prototype into the prototype chain.
TakeEnumerable.prototype = Object.create(Enumerable.prototype);

/** Returns an Enumerator that iterates through the current collection.
 * @this TakeEnumerable
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
TakeEnumerable.prototype.getEnumerator = function() {
	return new TakeEnumerator(this._source, this._count);
};
/**
 * @file Defines the TakeEnumerator used to iterate through collections created by a take operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a concat operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} source - The sequence to return elements from.
 * @param {Number} count - The number of elements to return.
 */
function TakeEnumerator(source, number) {
	this._enumerator = source.getEnumerator();
	this._number = number;
	this.reset();
}

/** Gets the current element in the collection.
 * @this TakeEnumerator
 */
TakeEnumerator.prototype.getCurrent = function () {
	return this._enumerator.getCurrent();
};

/** Advances the enumerator to the next element of the collection.
 * @this TakeEnumerator
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
TakeEnumerator.prototype.moveNext = function () {
	return this._count++ < this._number && this._enumerator.moveNext();
};

/** Sets the enumerator to its initial position, which is before the first element in the collection.
 * @this TakeEnumerator
 */
TakeEnumerator.prototype.reset = function () {
	this._enumerator.reset();
	this._count = 0;
};

/**
 * @file Adds the takeWhile method to the Enumerable prototype.
 * @author Chips100
 */

/** Returns elements from a sequence as long as a specified condition is true. 
 * @this Enumerable
 * The element's index can be used in the logic of the predicate function.
 * @param {Function} predicate - A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
 * @returns {Enumerable} An Enumerable that contains elements from the input sequence that occur before the element at which the test no longer passes.
 */
Enumerable.prototype.takeWhile = function(predicate) {
	return new TakeWhileEnumerable(this, predicate);
};

/**
 * Represents an Enumerable created by a takeWhile operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} source - The sequence to return elements from.
 * @param {Function} predicate - A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
 */
function TakeWhileEnumerable(source, predicate) {
	LinqAssert.requiredEnumerable(source, 'source');
	LinqAssert.requiredFunction(predicate, 'predicate');
	
	this._source = source;
	this._predicate = predicate;
}

// Put the Enumerable prototype into the prototype chain.
TakeWhileEnumerable.prototype = Object.create(Enumerable.prototype);

/** Returns an Enumerator that iterates through the current collection.
 * @this TakeWhileEnumerable
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
TakeWhileEnumerable.prototype.getEnumerator = function() {
	return new TakeWhileEnumerator(this._source, this._predicate);
};
/**
 * @file Defines the TakeWhileEnumerator used to iterate through collections created by a takeWhile operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a takeWhile operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} source - The sequence to return elements from.
 * @param {Function} predicate - A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
 */
function TakeWhileEnumerator(source, predicate) {
	this._enumerator = source.getEnumerator();
	this._predicate = predicate;
	this.reset();
}

/** Gets the current element in the collection.
 * @this TakeWhileEnumerator
 * @returns {*} The current element in the collection.
 */
TakeWhileEnumerator.prototype.getCurrent = function() {
	if (!this._hasReachedEnd) {
		return this._enumerator.getCurrent();
	}
	else {
		throw new Error('Tried to call getCurrent() on invalid cursor position.');
	}
};

/** Advances the enumerator to the next element of the collection.
 * @this TakeWhileEnumerator
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
TakeWhileEnumerator.prototype.moveNext = function() {
	var current;
	
	this._index++;
	if (this._enumerator.moveNext()) {
		current = this._enumerator.getCurrent();
		if (this._predicate.call(current, current, this._index)) {
			return true;
		}
		else {
			this._hasReachedEnd = true;
			return false;
		}
	}
	else {
		return false;
	}
};

/** Sets the enumerator to its initial position, which is before the first element in the collection.
 * @this TakeWhileEnumerator
 */
TakeWhileEnumerator.prototype.reset = function() {
	this._enumerator.reset();
	this._index = -1;
	this._hasReachedEnd = false;
};

/**
 * @file Adds the union method to the Enumerable prototype.
 * @author Chips100
 */

/** Produces the set union of two sequences by using a specified comparer.
 * @this Enumerable
 * @param {Enumerable} second - An Enumerable whose distinct elements form the second set for the union.
 * @param {Function|EqualityComparer} comparer - A function or an EqualityComparer to compare values for equality.
 * @returns {Enumerable} An Enumerable that contains the elements from both input sequences, excluding duplicates.
 */
Enumerable.prototype.union = function (second, comparer) {
	return new UnionEnumerable(this, second, comparer);
};

/**
 * Represents an Enumerable created by a union operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} first - An Enumerable whose distinct elements form the first set for the union.
 * @param {Enumerable} second - An Enumerable whose distinct elements form the second set for the union.
 * @param {Function|EqualityComparer} comparer - A function or an EqualityComparer to compare values for equality.
 */
function UnionEnumerable(first, second, comparer) {
	LinqAssert.requiredEnumerable(first, 'first');
	LinqAssert.requiredEnumerable(second, 'second');

	this._first = first;
	this._second = second;
	this._comparer = comparer;
}

// Put the Enumerable prototype into the prototype chain.
UnionEnumerable.prototype = Object.create(Enumerable.prototype);

/** Returns an Enumerator that iterates through the current collection.
 * @this UnionEnumerable
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
UnionEnumerable.prototype.getEnumerator = function () {
	return new UnionEnumerator(this._first, this._second, this._comparer);
};
/**
 * @file Defines the UnionEnumerator used to iterate through collections created by a union operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a union operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} first - An Enumerable whose distinct elements form the first set for the union.
 * @param {Enumerable} second - An Enumerable whose distinct elements form the second set for the union.
 * @param {Function|EqualityComparer} comparer - A function or an EqualityComparer to compare values for equality.
 */
function UnionEnumerator(first, second, comparer) {
	this._firstEnumerator = first.getEnumerator();
	this._secondEnumerator = second.getEnumerator();
	this._comparer = comparer;

	this.reset();
}

/** Gets the current element in the collection.
 * @this UnionEnumerator
 * @returns {*} The current element in the collection.
 */
UnionEnumerator.prototype.getCurrent = function () {
	if (this._isFirstActive) {
		return this._firstEnumerator.getCurrent();
	}
	else {
		return this._secondEnumerator.getCurrent();
	}
};

/** Advances the enumerator to the next element of the collection.
 * @this UnionEnumerator
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
UnionEnumerator.prototype.moveNext = function () {
	var current,
		foundItem = false,
		currentHash;

	if (this._isFirstActive) {
		if (this._firstEnumerator.moveNext()) {
			foundItem = true;
			current = this._firstEnumerator.getCurrent();
		}
		else {
			// First sequence is exhausted, try the second one by this.moveNext().
			this._isFirstActive = false;
			return this.moveNext();
		}
	}
	else {
		if (this._secondEnumerator.moveNext()) {
			foundItem = true;
			current = this._secondEnumerator.getCurrent();
		}
	}

	if (foundItem) {
		// We found another item. Make sure it has not already been yielded.
		currentHash = this._comparer.getHashCode(current);

		if (!this._seenElements[currentHash]) {
			this._seenElements[currentHash] = [current];
			return true;
		}
		else {
			for (var i = this._seenElements[currentHash].length - 1; i >= 0; i--) {
				if (this._comparer.equals(current, this._seenElements[currentHash][i])) {
					return this.moveNext();
				}
			}

			this._seenElements[currentHash].push(current);
			return true;
		}
	}
	else {
		return false;
	}
};

/** Sets the enumerator to its initial position, which is before the first element in the collection.
 * @this UnionEnumerator
 */
UnionEnumerator.prototype.reset = function () {
	this._firstEnumerator.reset();
	this._secondEnumerator.reset();
	this._isFirstActive = true;
	this._seenElements = {};
};

/**
 * @file Adds the where method to the Enumerable prototype.
 * @author Chips100
 */

/** Filters a sequence of values based on a predicate. 
 * Each element's index can be used in the logic of the predicate function.
 * @this Enumerable
 * @param {Function} predicate - A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
 * @returns {Enumerable} An Enumerable that contains elements from the input sequence that satisfy the condition.
 */
Enumerable.prototype.where = function(predicate) {
	return new WhereEnumerable(this, predicate);
};

/**
 * Represents an Enumerable created by a where operation.
 * @class
 * @augments Enumerable
 * @param {Enumerable} source - An Enumerable to filter.
 * @param {Function} predicate - A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
 */
function WhereEnumerable(source, predicate) {
	LinqAssert.requiredEnumerable(source, 'source');
	LinqAssert.requiredFunction(predicate, 'predicate');
	
	this._source = source;
	this._predicate = predicate;
}

// Put the Enumerable prototype into the prototype chain.
WhereEnumerable.prototype = Object.create(Enumerable.prototype);

/** Returns an Enumerator that iterates through the current collection.
 * @this WhereEnumerable
 * @override
 * @returns {Enumerator} An Enumerator that can be used to iterate through the current collection.
 */
WhereEnumerable.prototype.getEnumerator = function() {
	return new WhereEnumerator(this._source, this._predicate);
};
/**
 * @file Defines the WhereEnumerator used to iterate through collections created by a where operation.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through a collection created by a where operation.
 * @class
 * @augments Enumerator
 * @param {Enumerable} source - An Enumerable to filter.
 * @param {Function} predicate - A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
 */
function WhereEnumerator(source, predicate) {
	this._enumerator = source.getEnumerator();
	this._predicate = predicate;
	this.reset();
}

/** Gets the current element in the collection.
 * @this WhereEnumerator
 * @returns {*} The current element in the collection.
 */
WhereEnumerator.prototype.getCurrent = function() {
	return this._enumerator.getCurrent();
};

/** Advances the enumerator to the next element of the collection.
 * @this WhereEnumerator
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
WhereEnumerator.prototype.moveNext = function() {
	var current;
	
	while(this._enumerator.moveNext()) {
		current = this._enumerator.getCurrent();
		if (this._predicate.call(current, current, ++this._index)) {
			return true;
		}
	}
	
	return false;
};

/** Sets the enumerator to its initial position, which is before the first element in the collection.
 * @this WhereEnumerator
 */
WhereEnumerator.prototype.reset = function() {
	this._enumerator.reset();
	this._index = -1;
};
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
/**
 * @file Documents the structure of the EqualityComparer type.
 */

/** Supports comparing values for equality and generating hash codes for values.
 * @typedef EqualityComparer
 * @type Object
 * @property {EqualsFunction} equals Determines whether two values are equal.
 * @property {GetHashCodeFunction} getHashCode Calculates a hash code for the specified value to use for data structures and algorithms.
 */

/** Determines whether two values are equal.
 * @function EqualsFunction
 * @param {*} a - The first value to compare.
 * @param {*} b - The second value to compare.
 * @returns {Boolean} true if the specified values are equal; otherwise, false.
 */
		
/** Calculates a hash code for the specified value to use for data structures and algorithms.
 * @function GetHashCodeFunction
 * @param {*} value - The value for which to get a hash code.
 * @returns {Number} A hash code for the specified value.
 */
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
  }
};
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

  /** Default equality comparer function that checks two arguments for equality.
   * @param {*} [a] - The first value that should be checked for equality.
   * @param {*} [b] - The second value that should be checked for equality.
   * @returns {Boolean} True, if the arguments are equal, otherwise false.
   */
  defaultEqualityComparer: function (a, b) {
    return a === b;
  },

  /** Default selector function to use when elements should be projected.
   * @param {*} [x] - The value to project.
   * @returns {*} The projected value.
   */
  defaultSelectorFunction: function(x) {
    return x;
  },

  /** Determines if the specified value is an array.
   * @param {*} [input] - Value that could be an array.
   * @returns {Boolean} True, if the specified value is an array; otherwise false.
   */
  isArray: function (input) {
    // http://stackoverflow.com/questions/4775722/check-if-object-is-array
    return Object.prototype.toString.call(input) === '[object Array]';
  },

  /** Determines if the specified value is a sequence.
   * @param {*} [input] - Value that could be a sequence.
   * @returns {Boolean} True, if the specified value is a sequence; otherwise false.
   */
  isEnumerable: function (input) {
    return input instanceof Enumerable;
  },

  /** Determines if the specified value is a function.
   * @param {*} [input] - Value that could be a function.
   * @returns {Boolean} True, if the specified value is a function; otherwise false.
   */
  isFunction: function (input) {
    return typeof (input) === 'function';
  }
};

/**
 * @file Defines the List type.
 * @author Chips100
 */

/**
 * Creates a list from the specified sequence, or an empty list if omitted.
 * @class
 * @augments Enumerable
 * @param {Array|Enumerable} [array] - An array or a sequence with items to initially fill the list with.
 */
function List(array) {
    if (!array) {
        this._array = [];
    }
    else if (LinqUtils.isArray(array)) {
        this._array = array.slice(0);
    }
    else if (LinqUtils.isEnumerable(array)) {
        this._array = array.toArray();
    }
    else {
        LinqAssert.throwArgumentError('array');
    }
}

// Put the Enumerable prototype into the prototype chain.
List.prototype = Object.create(Enumerable.prototype);

/** Adds an object to the end of the List. 
 * @this List
 * @param {*} item - The object to be added to the end of the List.
 */
List.prototype.add = function(item) {
  this._array.push(item);  
};

/** Adds the elements of the specified collection to the end of the List.
 * @this List
 * @param {Array|Enumerable} items - The sequence whose elements should be added to the end of the List.
 */
List.prototype.addRange = function(items) {
  items = LinqUtils.createEnumerable(items);
  
  var enumerator = items.getEnumerator();
  while(enumerator.moveNext()) {
      this.add(enumerator.getCurrent());
  }
};

/** Removes all elements from the List.
 * @this List
 */
List.prototype.clear = function() {
  this._array.length = 0;  
};

/** Copies a range of elements from this List to a one-dimensional array, starting at the specified index of the target array.
 * @this List
 * @param {Number} [index] - The zero-based index in this List at which copying begins. If omitted, the complete List is copied.
 * @param {Array} [array] - The one-dimensional Array that is the destination of the elements copied from List.
 * @param {Number} [arrayIndex] - The zero-based index in array at which copying begins.
 * @param {Number} [count] - The number of elements to copy. If omitted, all elements to the end of the list are copied.
 */
List.prototype.copyTo = function(index, array, arrayIndex, count) {
    // Check if index parameter was omitted
    if (LinqUtils.isArray(index)) {
        count = arrayIndex;
        arrayIndex = array;
        array = index;
        index = 0;
    }
    
    // Check if other parameters were omitted in a supported manner.
    arrayIndex = arrayIndex || 0;
    count = count || +Infinity;
    
    // Check arguments.
    LinqAssert.requiredValue(array);
    LinqAssert.requiredPositiveNumber(index, 'index');
    LinqAssert.requiredPositiveNumber(arrayIndex, 'arrayIndex');
    LinqAssert.requiredPositiveNumber(count, 'count');
    
    var skipped = 0,
        counter = 0,
        currentIndex = 0,
        enumerator = this.getEnumerator();
    
    // Skip elements from this sequence to start at the specified index.    
    while (skipped < index) {
        enumerator.moveNext();
        skipped++;
    }
    
    while(count > counter && enumerator.moveNext()) {
        array[currentIndex] = enumerator.getCurrent();
        currentIndex++;
        counter++;
    }
};

/** Returns a number that represents how many elements in the specified sequence satisfy a condition.
 * @this List
 * @override 
 * @param {Function} [predicate] - A function to test each element for a condition. If omitted, all items are counted.
 * @returns {Number} A number that represents how many elements in the sequence satisfy the condition in the predicate function.
 */
List.prototype.count = function(predicate) {
  if (!predicate) {
    return this._array.length;
  }
  else {
    return Enumerable.prototype.count.call(this, predicate);
  }
};

/** Returns the element at a specified index in a sequence.
 * @this List
 * @override 
 * @param {Number} index - The zero-based index of the element to retrieve.
 * @returns {*} The element at the specified position in the source sequence.
 */
List.prototype.elementAt = function(index) {
    return this._array[index];
}

/** Returns an enumerator that iterates through this list.
 * @this List
 * @override
 * @returns {ListEnumerator} An enumerator object that can be used to iterate through this list.
 */
List.prototype.getEnumerator = function() {
  return new ListEnumerator(this._array);  
};

/** Inserts an element into this List at the specified index.
 * @this List
 * @param {Number} index - The zero-based index at which the element should be inserted.
 * @param {*} element - The value to insert.
 */
List.prototype.insert = function(index, element) {
    this._array.splice(index, 0, element);
};

/** Inserts the elements of an array or a sequence into this List at the specified index.
 * @this List
 * @param {Number} index - The zero-based index at which the new elements should be inserted.
 * @param {Array|Enumerable} elements - The sequence whose elements should be inserted into this List.
 */
List.prototype.insertRange = function(index, elements) {
    LinqAssert.requiredPositiveNumber(index, 'index');
    elements = LinqUtils.createEnumerable(elements, 'elements');
    
    // First parameters for the splice call.
    var args = [index, 0];
    
    // The values to insert should be supplied as individual parameters to splice.
    // We make use of the "apply" method to provide the values in an array.
    var enumerator = elements.getEnumerator();
    while(enumerator.moveNext()) {
        args.push(enumerator.getCurrent());
    }
    
    Array.prototype.splice.apply(this._array, args);
};

/** Reverses the order of the elements in this List.
 * @this List
 * @param {Number} [index] - The zero-based starting index of the range to reverse. If omitted, the complete List is reversed.
 * @param {Number} [count] - The number of elements in the range to reverse.
 */
List.prototype.reverse = function(index, count) {
  if (isNaN(index)) {
    this._array.reverse();  
  }
  else {
    
    var range = this._array.slice(index, index + count);
    range.reverse();
    
    // Insert first parameters to splice.
    range.unshift(range.length);
    range.unshift(index);
    Array.prototype.splice.apply(this._array, range);     
  }
};
/**
 * @file Defines the ListEnumerator type used to iterate over instances of List.
 * @author Chips100
 */

/**
 * Represents an Enumerator used to iterate through an instance of List.
 * @class
 * @augments Enumerator
 * @param {Array} [array] - An array that served as the storage for the List that should be iterated.
 */
function ListEnumerator(arr) {
	this._array = arr || [];
	this.reset();
}

/** Gets the current element in the collection.
 * @this ListEnumerator
 * @returns {*} The current element in the collection.
 */
ListEnumerator.prototype.getCurrent = function() {
	return this._array[this._index];
};

/** Advances the enumerator to the next element of the collection.
 * @this ListEnumerator
 * @returns {Boolean} true if the enumerator was successfully advanced to the next element; false if the enumerator has passed the end of the collection.
 */
ListEnumerator.prototype.moveNext = function() {
	return ++this._index < this._count;
};

/** Sets the enumerator to its initial position, which is before the first element in the collection.
 * @this ListEnumerator
 */
ListEnumerator.prototype.reset = function() {
	this._index = -1;
	this._count = this._array.length;
};

/**
 * @file Defines the Grouping type that is used to hold multiple elements associated with a key.
 * @author Chips100
 */

/**
 * Creates a Grouping with the specified key.
 * @class
 * @param {*} key - The key that the elements in this grouping are associated with.
 */
function Grouping(key) {
    this._elements = new List();
    this._elements.key = key;
}

/** Adds the specified element to this Grouping.
 * @this Grouping
 * @param {*} element - The element to add to this grouping.
 */
Grouping.prototype.addElement = function(element) {
    this._elements.add(element);
};

/** Gets the elements of this Grouping.
 * @this Grouping
 * @returns {Enumerable} A sequence with the elements of this Grouping.
 */
Grouping.prototype.getElements = function() {
    return this._elements;
};

/** Gets the key that the elements in this grouping are associated with.
 * @this Grouping
 * @returns {*} The key that the elements in this grouping are associated with.
 */
Grouping.prototype.getKey = function() {
    return this._elements.key;
};
/**
 * @file Defines the Lookup type that is used to group elements by keys.
 * @author Chips100
 */

/**
 * Creates a Lookup from a sequence according to a specified key selector function and an element selector function.
 * @class
 * @param {Enumerable|Array} source - The source sequence with the elements to create the Lookup from.
 * @param {Function} keySelector - A function used to extract a key from each element.
 * @param {Function} [elementSelector] - A transform function to produce a result element value from each element.
 * @param {Function|EqualityComparer} [keyEqualityComparer] - Comparer used for comparing keys extracted from elements.
 */
function Lookup(source, keySelector, valueSelector, keyEqualityComparer) {
    LinqAssert.requiredFunction(keySelector, 'keySelector');
    var sourceEnumerable = LinqUtils.createEnumerable(source, 'source');

    this._keyEqualityComparer = LinqUtils.createEqualityComparer(keyEqualityComparer);
    this._lookupByHashcodes = {};
    this._keys = [];

    this._setup(sourceEnumerable, keySelector, LinqUtils.createSelectorFunction(valueSelector));
}

/** Adds the specified value to this lookup, grouping it under the specified key.
 * @this Lookup
 * @private
 * @param {*} key - The key under which the value should be added.
 * @param {*} value - The value to add to this Lookup.
 */
Lookup.prototype._addValueWithKey = function(key, value) {
    var grouping = this._getGroupingByKey(key);

    if (!grouping) {        
        grouping = new Grouping(key);
        keyHash = this._keyEqualityComparer.getHashCode(key);

        this._lookupByHashcodes[keyHash] = this._lookupByHashcodes[keyHash] || [];
        this._lookupByHashcodes[keyHash].push(grouping);
        this._keys.push(key);
    }
    
    grouping.addElement(value);
};

/** Gets the grouping for the specified key.
 * @this Lookup
 * @private
 * @param {*} key - The key for which to get the grouping.
 * @returns {Grouping} The grouping that holds the elements for the specified key, or undefined if the key is not used in this Lookup.
 */
Lookup.prototype._getGroupingByKey = function(key) {
    var keyHash = this._keyEqualityComparer.getHashCode(key),
        groupingsWithKeyHash = this._lookupByHashcodes[keyHash];

    if (groupingsWithKeyHash) {
        for (var i = groupingsWithKeyHash.length - 1; i >= 0; i--) {
            if (this._keyEqualityComparer.equals(groupingsWithKeyHash[i].getKey(), key)) {
                return groupingsWithKeyHash[i];
            }
        }
    }
};

/** Initializes this Lookup with the specified elements using the specified key and value selector functions.
 * @this Lookup
 * @private
 * @param {Enumerable} enumerable - The source sequence with the elements to fill this lookup with.
 * @param {Function} keySelector - A function used to extract a key from each element.
 * @param {Function} [elementSelector] - A transform function to produce a result element value from each element.
 */
Lookup.prototype._setup = function(enumerable, keySelector, valueSelector) {
    var enumerator = enumerable.getEnumerator(),
        current = undefined;

    while(enumerator.moveNext()) {
        current = enumerator.getCurrent();
        this._addValueWithKey(keySelector(current), valueSelector(current));
    }
};

/** Gets the elements that have been grouped under the specified key.
 * @this Lookup
 * @param {*} key - The key to get elements for.
 * @returns {Enumerable} A sequence with the elements grouped under the specified key.
 */
Lookup.prototype.get = function(key) {
    var grouping = this._getGroupingByKey(key);

    if (grouping) {
        return grouping.getElements();
    }
    else {
        return Enumerable.empty();
    }
};

/** Gets the keys that are known in this Lookup.
 * @this Lookup
 * @returns {Enumerable} A sequence with the keys that are known in this Lookup.
 */
Lookup.prototype.getKeys = function() {
    return new List(this._keys);
};