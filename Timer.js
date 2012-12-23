/**
 * @class Timer
 * @classDescription A timer class to easily handle timing in JavaScript (based on AS3 Timer)
 * @author Nicolas Vannier
 ***************************
 * @param {number} delay	The delay between timer events, in milliseconds
 * @param {int} repeatCount	Specifies the number of repetitions. If zero, the timer repeats infinitely.
 */
function Timer(delay, repeatCount) {
	if (this == window) {
		throw new Error('Timer is a class constructor. Use the keyword "new" to call it.');
	}

//////////
// PRIVATE MEMBERS
//
	var that = this;
	var _repeatCount;
	var _delay;
	var _timer = null;		// The setInterval or setTimeout reference
	var _callbacks = {
		TIMER: [],
		TIMER_COMPLETE: []
	};


//////////
// PUBLIC MEMBERS
//
	this.currentCount = 0;	// The total number of times the timer has fired since it started
	this.running = false;


//////////
// GETTERS
//
	this.getRepeatCount = function() {
		return _repeatCount;
	};

	this.getDelay = function() {
		return _delay;
	};

	this.getTimer = function() {
		return _timer;
	};

	this.getCallbacks = function() {
		return _callbacks;
	};


//////////
// SETTERS
//
	this.setRepeatCount = function(value) {
		if (_repeatCount != undefined) {
			that.reset();
		}
		_repeatCount = value;
	};

	this.setDelay = function(value) {
		if (_delay != undefined) {
			that.reset();
		}
		if (value < 0) {
			throw new Error('Timer Error : "delay" must be a positive number.');
		}
		_delay = value;
	};

	this.setTimer = function(value) {
		if (_timer != undefined) {
			that.reset();
		}
		_timer = value;
	};

	// We call the setters on instanciation to handle special cases
	this.setRepeatCount(repeatCount);
	this.setDelay(delay);
}

/**
 * Starts the timer, if it is not already running.
 */
Timer.prototype.start = function() {
	if (this.running) {
		return;
	}
	this.running = true;
	console.log('this.running: ', this.running);

	var that = this;
	console.log('that: ', that);
	var repeatCount = that.getRepeatCount();
	var callbacks = that.getCallbacks().TIMER;

	// The method called on each loop, that calls the listeners
	var trigger = function() {
		// console.log('that: ', that);
		if (!that.running) {
			return;
		}

		for (var i = 0; i < callbacks.length; i++) {
			callbacks[i]();
		};

		that.currentCount++;
		if (repeatCount != 0 && that.currentCount >= repeatCount) {	// If the loop is not infinite, and the current count has reached the repeat count
			that.complete();	// We call the TIMER_COMPLETE listeners
			that.stop();		// We stop the timer
			return;
		}
	};

	this.setTimer(setInterval(trigger, this.getDelay()));
};

/**
 * Stops the timer. When start() is called after stop(), the timer
 * instance runs for the remaining number of repetitions, as set by the repeatCount property.
 */
Timer.prototype.stop = function() {
	var repeatCount = this.getRepeatCount(),
		timer = this.getTimer();

	if (!this.running) {
		return;
	}
	if (timer != undefined) {
		clearInterval(this.getTimer());	// We stop the timer
	}
	this.running = false;
};

/**
 * Calls all the TIMER_COMPLETE listeners
 */ 
Timer.prototype.complete = function() {
	var callbacks = this.getCallbacks().TIMER_COMPLETE;
	for (var i = 0; i < callbacks.length; i++) {
		callbacks[i]();
	};
};

/**
 * Stops the timer, if it is running, and sets the currentCount property back to 0,
 * like the reset button of a stopwatch. Then, when start() is called,
 * the timer instance runs for the specified number of repetitions,
 * as set by the repeatCount value.
 */
Timer.prototype.reset = function() {
	if (this.running) {
		this.stop();
		this.currentCount = 0;
	}
};

/**
 * Adds a callback to call on each loop, or once the timer is complete
 * @param {string} event	The event to listen to (TIMER or TIMER_COMPLETE)
 * @param {function} callback	The method to call when the event is triggered
 */
Timer.prototype.addEventListener = function(event, callback) {
	if (typeof callback === 'function' && (event === Timer.Event.TIMER || event === Timer.Event.TIMER_COMPLETE)) {
		var callbacks = this.getCallbacks();
		callbacks[event].push(callback);
	}
};

/**
 * Removes an existing listener
 * @param {string} event	The event to stop listening to (TIMER or TIMER_COMPLETE)
 * @param {function} callback	The callback to remove
 */
Timer.prototype.removeEventListener = function(event, callback) {
	if (event === Timer.Event.TIMER || event === Timer.Event.TIMER_COMPLETE) {
		var callbacks = this.getCallbacks();
		for (var i = 0; i < callbacks[event].length; i++) {
			if (callbacks[event][i] === callback) {
				callbacks[event].splice(i, 1);
			}
		};
	}
};

/**
 * A list of timer related events
 * @type object
 */
Timer.Event = {
	TIMER: 'TIMER',						// Triggered on each loop
	TIMER_COMPLETE: 'TIMER_COMPLETE'	// Trigerred at the end of the timer
};