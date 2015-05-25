var sorted = require('sorted');

// the actual sequencer object
function Sequencer () {
	this._out = sorted([0], function (a, b) {
		if (a == b) return 0;
	    else if (a > b) return 1;
	    else if (a < b) return -1;
		else if (typeof(b) === "undefined") return -1;
	    else throw new RangeError('Unstable comparison: ' + a + ' cmp ' + b);
	});
}

Sequencer.prototype.getNext = function () {
	var val = this._out.get(this._out.length - 1) + 1;
	this._out.insert(val);
	return val;
};

Sequencer.prototype.turnIn = function (value) {
	if (value <= 0) {
		throw new Error("cannot turn in "+value+"; value <= 0");
	}
	
	// used to tell us if anything was actually turned in
	var signalBit = 0;
	
	// do the filter
	this._out = this._out.filter(function(v) { if (v === value) signalBit = 1; return v !== value; });
	
	// we didn't turn in
	if (signalBit === 0) {
		throw new Error("cannot turn in "+value+"; value not checked out");
	}
	
	return signalBit;
};

Sequencer.prototype.length = function () {
	return this._out.length - 1 ; // cause 0 is there to start
};

var _instance = null;

// a singleton helper to get the next available sequence number, or turnIn an old one
function process (turnIn) {
	if (_instance == null) {
		_instance = new Sequencer();
	}

	if (typeof(turnIn) === "undefined") {
		// get the next value and return it
		return _instance.getNext();
	} else {
		// cause you shouldn't be using this value, return -1
		return _instance.turnIn(turnIn);
	}
}

// map the ctor as a property on the singleton just in case we need it
process.Sequencer = Sequencer;

// a reset function
process.reset = function () {
	delete _instance;
	_instance = null;
};

// export our singleton
module.exports = process;