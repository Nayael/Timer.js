Timer.js
==============
*A Timer class to easily handle timing in JavaScript (based on AS3 Timer)*

## Usage ##
Use this class exactly like the ActionScript 3 Timer :

    /* Instanciate a timer that loops 5 times every 1000 milliseconds
     * (Setting the second argument to 0 will create an infinite timer)
     */
    var timer = new Timer(1000, 5);

    /*
     * Add listeners to trigger on a Timer event
     */
    function thing() {
        doThings;
    }

    /* The method will be called 5 times, every second */
	timer.addEventListener(Timer.Event.TIMER, function() {
		doStuff;
	});

	/* thing() will be called once the 5 loops are complete */
	timer.addEventListener(Timer.Event.TIMER_COMPLETE, thing);

	timer.start();	// Start the timer

Like in AS3, you can `stop()`, or `reset()` the timer anytime you want.  
Note that `reset()` will stop the timer if it is running.  

You can remove the listeners by calling `removeEventListener()` :

    /* thing() won't be called anymore */
	timer.removeEventListener(Timer.Event.TIMER_COMPLETE, thing);

This can't be done with anonymous methods.

    /* IMPOSSIBLE */
	timer.removeEventListener(Timer.Event.TIMER, function() {
		doStuff;
	});

## Public properties ##
**currentCount : int**  
[read-only] The total number of times the timer has fired since it started at zero.

**running : Boolean**  
[read-only] The timer's current state; true if the timer is running, otherwise false.

## Public methods ##
**Timer(delay, repeatCount)**  
Constructs a new Timer object with the specified delay and repeatCount states.

**reset():void**  
Stops the timer, if it is running, and sets the currentCount property back to 0, like the reset button of a stopwatch.

**start():void**  
Starts the timer, if it is not already running.

**stop():void**  
Stops the timer.

**complete():void**  
Calls all the listeners to the [TIMER_COMPLETE](#events) event.

**addEventListener(event, callback):void**  
Adds a listener to be triggered on a [Timer event](#events)

**removeEventListener(event, callback):void**  
Removes a previously added listener

## Getters ##
**getRepeatCount():int**  
Returns the total number of times the timer is set to run.

**getDelay():int**  
Returns the delay, in milliseconds, between timer events.

**getTimer():***  
Returns the JavaScript `setInterval()` reference

**getCallbacks():object**  
Returns an associative array containing the listeners for each event

## Setters ##
**setRepeatCount(value:int):void**  
Sets the total number of times the timer is set to run.

**setDelay(value:int):void**  
Sets the delay, in milliseconds, between timer events.

## Events ##
**Timer.Event.TIMER**  
Triggered on each loop

**Timer.Event.TIMER_COMPLETE**  
Triggered at the end of the timer
