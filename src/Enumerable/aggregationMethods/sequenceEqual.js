/**
 * @file Adds the sequenceEqual method to the Enumerable prototype.
 * @author Chips100
 */

/** Determines if this sequence contains elements that are equal to the elements of another sequence.
 * @this Enumerable
 * @param {Enumerable} second - The sequence with the elements that should be compared to the elements of this sequence.
 * @param {Function|EqualityComparer} [equalityComparer] - Equality comparer used for comparing elements for equality.
 * @returns {Boolean} True, if this sequence contains elements that are equal to the elements of the other sequence, otherwise false.
 */
Enumerable.prototype.sequenceEqual = function(second, equalityComparer) {
    LinqAssert.requiredEnumerable(second, 'second');
    equalityComparer = LinqUtils.createEqualityComparer(equalityComparer);

    var firstEnumerator = this.getEnumerator(),
        secondEnumerator = second.getEnumerator();

    if (!firstEnumerator.moveNext() & !secondEnumerator.moveNext()) {
        return true;
    }
    else {
        do {
            if (!equalityComparer.equals(firstEnumerator.getCurrent(), secondEnumerator.getCurrent())) {
                return false;
            }

            var firstHasNext = firstEnumerator.moveNext();
            var secondHasNext = secondEnumerator.moveNext();

            if (firstHasNext !== secondHasNext) {
                return false;
            }
            if (!firstHasNext) {
                return true;
            }
        } while(true);
    }
};