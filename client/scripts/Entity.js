import eventEmitter from './EventEmitter.js';

/**
 * Base class for any game object that has global event listeners
 */
export default class Entity {
  constructor() {
    this.eventListeners = []; // { event: '', listener: () => {} }
  }

  init() {
    // setup event listeners
    this.eventListeners.forEach((listener) => {
      // eventEmitter.on(listener.event, listener.listener);
      eventEmitter.on(listener.event, listener.listener, this);
    });
  }

  destruct() {
    // remove event listeners
    this.eventListeners.forEach((listener) => {
      eventEmitter.off(listener.event, listener.listener);
    });
  }
}
