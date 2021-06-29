import Entity from './Entity.js';
import eventEmitter from './EventEmitter.js';
import canvasWrapper from './CanvasWrapper.js';
import playerInput from './PlayerInput.js';

import PlayerCharacter from './PlayerCharacter.js';

// class Application extends debuggableMixin(Entity) {
class Application extends Entity {
  constructor() {
    super();

    this.playerCharacter = null;

    this.eventListeners = [
    ];

    // this.debugItems = [
    //   { valuePrinter: () => `event listener count: ${eventEmitter.getTotalListenerCount()}` },
    // ];
  }

  init() {
    super.init();

    // singletons
    canvasWrapper.init();
    playerInput.init();

    this.playerCharacter = PlayerCharacter.create();
  }
}

export default new Application();