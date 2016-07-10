/**
 * @file Adds the average method to the Enumerable prototype.
 * @author Chips100
 */

/** Calculates the average of the items in the sequence using a projection, if specified.
 * @this Enumerable
 * @param {Function} [selector] - A function to project each item to a number that should be used for calculating the average.
 * @returns {Number} The average value of the items in the sequence.
 */
Enumerable.prototype.average = function (selector) {
    selector = LinqUtils.createSelectorFunction(selector);

    var enumerator = this.getEnumerator(),
        sum = 0, count = 0;

    if (!enumerator.moveNext()) {
        LinqAssert.throwSequenceEmptyError();
    }
    else {
        do {
            sum += selector(enumerator.getCurrent());
            count++;
        } while(enumerator.moveNext());

        return sum / count;
    }
};