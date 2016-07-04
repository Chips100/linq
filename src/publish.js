(function() {
    var linq = function(input) {
        return new List(input);
    };

    linq.Enumerable = Enumerable;
    linq.List = List;
    linq.Lookup = Lookup;

    linq.publishOn = function(target) {
        target.Enumerable = linq.Enumerable;
        target.List = linq.List;
        target.Lookup = linq.Lookup;
    };


    // Publish linq definition for NodeJS, AMD or normal browser contexts.
    // Inspired by: http://www.matteoagosti.com/blog/2013/02/24/writing-javascript-modules-for-both-browser-and-node/
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = linq;
    }
    else {
        if (typeof define === 'function' && define.amd) {
            define([], function () {
                return linq;
            });
        }
        else {
            var linqBefore = window.linq;
            window.linq = linq;

            linq.noconflict = function () {
                window.linq = linqBefore;
                return this;
            };
        }
    }
})();