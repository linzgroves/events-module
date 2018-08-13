//Create the Event Emitter as a class
//The class will include a constructor that starts with an empy object to store the listeners in
class EventEmitter {
	constructor() {
    this.listeners = {};
  }

//Create the class methods that will be prototypes for this class
  //This listener will take two parameters: one for the name of the event the listener wants and a function that will be called when the event emits
    addListener (name, callback) {
    //If the 'listeners' object has a key for the name passed in, push the callback function onto the array, else add the key, value properties to 'listeners' object
        if (this.listeners.hasOwnProperty(name))
            this.listeners[name].push(callback);
        else
            this.listeners[name] = [callback];
    }

    removeListener (name, callback) {
    //If there is no key that matches the name passed in, return false
        if (!this.listeners.hasOwnProperty(name))
            return;
		//Set the index of the name key equal to the index for the associated callback. If not undefined, remove that item by its index position
        const index = this.listeners[name].indexOf(callback);
        if (index != -1)
            this.listeners[name].splice(index, 1);
    }

    emit(name, args) {
    //If there is no key that mathces the name passed in, again, return false
        if (!this.listeners.hasOwnProperty(name))
            return;
		//Create an empty array if no arguments exist yet
        if (!args || !args.length)
            args = [];
		//Iterate through the 'listeners' object and pass the any arguments to them
        const events = this.listeners[name], length = events.length;
        for (let i = 0; i < length; i++) {
            events[i].apply(null, args);
        }
    }
}

const emitTest = new EventEmitter();
emitTest.addListener('change', name => {
    console.log(name);
});
emitTest.emit('change', ['test']);
emitTest.removeListener('removeChange', name => {
		console.log(name);
});
emitTest.emit('change', ['test removed']);
