var assert = require('assert');

var singleton = require('../index');
var Sequencer = require('../index').Sequencer;

describe("Sequencer", function() {
	var s;
	
	before(function() {
		s = new Sequencer();		
	});

	it("should hand out numbers", function () {
		assert(s.getNext() ===  1, "first number should be 1");
		assert(s.getNext() ===  2, "second number should be 2");
		assert(s.getNext() ===  3, "third number should be 3");
	});
	
	it("should support turning in of numbers", function () {
		assert(s.turnIn(2) === 1, "the return of turnIn should be ignored");
		assert(s.length() === 2, "sequencer length should be 2");
		assert(s.getNext() ===  4, "forth number handed out should be 4");
		assert(s.turnIn(3) === 1, "the return of turnIn should be ignored");
		assert(s.turnIn(4) === 1, "the return of turnIn should be ignored");
	});
	
	it("should hand out low numbers, once they're turned in", function () {
		assert(s.getNext() ===  2, "fifth number handed out should be 2");
	});
	
	it("shouldn't allow turning in of <=0", function () {
		assert.throws(function() {
			s.turnIn(-1);
		}, function (err) {
			if ((err instanceof Error) && /cannot turn in/.test(err)) {
				return true;
			}
		}, "should throw on -1");
		
		assert.throws(function() {
			s.turnIn(0);
		}, function (err) {
			if ((err instanceof Error) && /cannot turn in/.test(err)) {
				return true;
			}
		}, "should throw on 0");
	});
	
	it("shouldn't allow turning in of turned in numbers", function () {
		assert.throws(function() {
			s.turnIn(4);
		}, function (err) {
			if ((err instanceof Error) && /cannot turn in/.test(err)) {
				return true;
			}
		}, "should throw on 4");
	});
});

describe("Sequencer Singleton", function () {
	it("should hand out numbers", function() {
		assert(singleton() === 1, "should hand out 1");
		assert(singleton() === 2, "should hand out 2");
		assert(singleton() === 3, "should hand out 3");
	});
	
	it("should support turning in of numbers", function () {
		assert(singleton(1) === 1, "should turn in 1");
		assert(singleton(2) === 1, "should turn in 2");
		assert(singleton(3) === 1, "should turn in 3");
	});
	
	it("should reset", function () {
		assert(singleton() === 1, "should hand out 1");
		assert(singleton() === 2, "should hand out 2");
		singleton.reset();
		assert(singleton() === 1, "should hand out 1");
		assert(singleton() === 2, "should hand out 2");
	});
});