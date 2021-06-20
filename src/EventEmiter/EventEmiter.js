class EventEmitter {
  constructor() {
    this.events = {};
  }

  emit(eventName, data) {
    const event = this.events[eventName];
    if (!event) return;
    event.forEach((fn) => fn.call(null, data));
  }

  subscribe(eventName, fn) {
    if (!this.events[eventName]) this.events[eventName] = [];

    this.events[eventName].push(fn);
    return () => {
      this.events[eventName] = this.events[eventName].filter(
        (eventFn) => fn !== eventFn
      );
    };
  }
}

export const eventEmitter = new EventEmitter();
