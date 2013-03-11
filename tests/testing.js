// VERY basic testing framework will be injected into current page
// specialized for linq project, we can make assertions about equality of arrays.
// will log failed assertions to the console.
(function(global) {
	global.Tester = Tester;
	
	function Assertion(reality, expectation, description) {
		this._reality = reality;
		this._expectation = expectation;
		this._description = description;
	}
	Assertion.prototype.isCorrect = function() {
		return isEqual(this._reality, this._expectation);
	}
	Assertion.prototype.toString = function() {
		return (this.isCorrect() ? 'PASS' : 'FAIL')
			+ ' ' + this._description;
	};
	Assertion.prototype.log = function() {
		console.log('---------------------------');
		console.log('Assertion failed! ' + this._description);
		console.log('Expected', this._expectation);
		console.log('Was', this._reality);
	};
	
	
	function isEqual(var1, var2) {
		//check for array instances
		//http://stackoverflow.com/questions/4775722/javascript-check-if-object-is-array
		if( Object.prototype.toString.call( var1 ) === '[object Array]' 
			&& Object.prototype.toString.call( var2 ) === '[object Array]') {
	    	return areArraysEqual(var1, var2);
		}
		else {
			return var1 === var2;
		}
		
		function areArraysEqual(arr1, arr2) {
			if (arr1.length === arr2.length) {
				for (var i = arr1.length - 1; i >= 0; i--) {
					if (arr1[i] !== arr2[i]) {
						return false;	
					}
				}
				
				return true;
			}
			else {
				return false;
			}
			
		}
	}
	
	
	function Tester() {
		this._assertions = [];
		this._passes = [];
		this._fails = [];
	}
	Tester.prototype.assert = function(reality, expectation, description) {
		this._assertions.push(new Assertion(reality, expectation, description));
	}
	Tester.prototype.run = function() {
		for (var i = 0, iLength = this._assertions.length; i < iLength; i++) {
			if (this._assertions[i].isCorrect()) {
				this._passes.push(this._assertions[i]);
			}
			else {
				this._fails.push(this._assertions[i]);
				this._assertions[i].log();
			}
		}
		
		console.log('---------------------------');
		console.log('Tested ' + this._assertions.length + ' assertions.');
		console.log(this._passes.length + ' assertions passed.');
		console.log(this._passes);
		console.log(this._fails.length + ' assertions failed.');
		console.log(this._fails);
	}

})(this);

