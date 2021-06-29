class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener, obj) {
    const existingEvent = this.events.get(event);
    if (existingEvent) {
      existingEvent.push(listener);
      // existingEvent.push({ obj, listener });
    } else {
      this.events.set(event, [listener]);
      // this.events.set(event, [{ obj, listener }]);
    }
  }
  
  off(event, listener) {
    const existingEvent = this.events.get(event);
    if (!existingEvent) return;
    const index = existingEvent.indexOf(listener);
    // let index;
    // for (let i = 0; i < existingEvent.length; i += 1) {
    //   if (existingEvent[i].listener == listener) index = i;
    // }
    if (index > -1) existingEvent.splice(index, 1);
  }

  emit(event, args) {
    const existingEvent = this.events.get(event);
    if (!existingEvent) return;
    existingEvent.forEach((listener) => {listener(args)});
    // existingEvent.forEach((listener) => {listener.listener(args)});
  }
  
  getTotalListenerCount() {
    let listenerCount = 0;
    this.events.forEach(listenerList => {
      listenerCount += listenerList.length;
    });
    return listenerCount;
  }
}

export default new EventEmitter();