
const EventEmitter = function () {
    this.listeners = {};

    this.addEventListener = (name, callback) => {
        if (this.listeners.hasOwnProperty(name))
            this.listeners[name].push(callback);
        else
            this.listeners[name] = [callback];
    };

    this.removeEventListener = (name, callback) => {
        if (!this.listeners.hasOwnProperty(name))
            return;

        const index = this.listeners[name].indexOf(callback);
        if (index != -1)
            this.listeners[name].splice(index, 1);
    };

    this.emit = (name, args) => {
        if (!this.listeners.hasOwnProperty(name))
            return;

        if (!args || !args.length)
            args = [];

        const events = this.listeners[name], length = events.length;
        for (let i = 0; i < length; i++) {
            events[i].apply(null, args);
        }
    };
};

const emitTest = new EventEmitter();
emitTest.addEventListener('change', name => {
    console.log(name);
});
emitTest.emit('change', ['test']);
