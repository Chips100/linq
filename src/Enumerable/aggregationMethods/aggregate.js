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