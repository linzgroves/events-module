//Create the Event Emitter as a class
//The class will include a constructor that starts with an empy object to store the listeners in
class EventEmitter {
	constructor() {
    this.events = {};
  }

//Create the class methods that will be prototypes for this class
  //This listener will take two parameters: one for the eventName of the event the listener wants and a function that will be called when the event emits
    addListener(eventName, callbackFn) {
    //If the 'listeners' object has a key for the eventName passed in, push the callbackFn onto the array, else add the key, value properties to 'events' object
        if (this.events.hasOwnProperty(eventName)) {
            this.events[eventName].push(callbackFn);
        }
        else {
            this.events[eventName] = [callbackFn];
        }
    }

    removeListener(eventName, callbackFn) {
    //If there is no key that matches the eventName passed in, return false
        if (!this.events.hasOwnProperty(eventName)) {
            return;
        }
		//Set the index of the eventName key equal to the index for the associated callbackFn. If not undefined, remove that item by its index position
        const index = this.events[eventName].indexOf(callbackFn);
        if (index != -1) {
            this.events[eventName].splice(index, 1);
        }
    }

    //When this method is called, move through the 'events' object and remove the corresponding value from the object
    removeAllListeners() {
      Object.keys(this.events).forEach(eventName => {
         return this.events[eventName].splice(0, this.events[eventName].length);
    	});
    }

    //Use the rest operator to bypass having to slice the arguments into an array
    emit(eventName, ...args){
    //If there is no key that matches the eventName passed in, again, return false
        if (!this.events.hasOwnProperty(eventName)) {
            return;
        }
        //In the 'events' object, for each corresponding value to the eventName passed in,
        //call the provided function which will apply the passed in arguments to 'callbackFn'
        this.events[eventName].forEach(callbackFn => callbackFn.apply(this, args));
        }

    //Passes in a function 'empty' when 'addListener' is called which allows
    //'removeListener' to be called and apply any arguments to 'callbackFn'
    once(eventName, callbackFn) {
        this.addListener(eventName, function empty () {
            this.removeListener(eventName, empty);
            callbackFn.apply(this, arguments);
        });
    }
}

const emitTest = new EventEmitter();

emitTest.addListener('change', (a, b) => {
    console.log(a, b);
});
emitTest.emit('change', 'a', 'b');

let m = 0;
emitTest.addListener('event', () => {
	console.log(++m);
});
emitTest.emit('event');
emitTest.emit('event');

let n = 0;
emitTest.once('changeOnce', () => {
	console.log(++n);
});
emitTest.emit('changeOnce');
emitTest.emit('changeOnce');

const callbackA = () => {
	console.log('A');
  emitTest.removeListener('newEvent', callbackB);
}
const callbackB = () => {
	console.log('B');
};

emitTest.addListener('newEvent', callbackA);
emitTest.addListener('newEvent', callbackB);
emitTest.emit('newEvent');
emitTest.emit('newEvent');

//emitTest.removeAllListeners();
