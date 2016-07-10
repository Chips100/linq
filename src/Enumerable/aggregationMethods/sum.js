/**
 * @file Adds the sum method to the Enumerable prototype.
 * @author Chips100
 */

/** Calculates the sum of the items in the sequence using a projection, if specified.
 * @this Enumerable
 * @param {Function} [selector] - A function to project each item to a number that should be used for calculating the sum.
 * @returns {Number} The sum of the items in the sequence.
 */
Enumerable.prototype.sum = function (selector) {
    selector = LinqUtils.createSelectorFunction(selector);

    var enumerator = this.getEnumerator(),
        sum = 0;;

    if (!enumerator.moveNext()) {
        LinqAssert.throwSequenceEmptyError();
    }
    else {
        do {
            sum += selector(enumerator.getCurrent());
        } while(enumerator.moveNext());

        return sum;
    }
};