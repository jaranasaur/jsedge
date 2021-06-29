import Entity from './Entity.js';
import Queue from './Queue.js';
import config from './Config.js';
import eventEmitter from './EventEmitter.js';
// import debuggableMixin from './Debuggable.js';

// class PlayerInput extends debuggableMixin(Entity) {
class PlayerInput extends Entity {
  constructor() {
    super();
    this.state = {
      // cursorDragging: false,
      button1Down: false,
      pos: { x: 0, y: 0 },
      // velocity: 0, // DEBUG
      keysDown: [],
    };

    this.rawInputQueue = new Queue();
    // debug only
    // this.inputEventsFromLastFrame = 0;

    config.keyBinds.forEach((bind) => {
      window.addEventListener(bind.domEvent, (e) => {
        if (bind.test(e)) this.rawInputQueue.add({ action: bind.action, e });
      });
    });

    this.update = ({ lastFrameTime }) => {
      // let distance = 0; // DEBUG
      // this.inputEventsFromLastFrame = this.rawInputQueue._values.length; // DEBUG
      this.rawInputQueue.shiftEach((inputEvent) => {
        switch (inputEvent.action) {
          // // TODO if spacebar is held, multiple cursorDowns fire
          // case 'cursorDown':
          //   eventEmitter.emit('cursorDown', { ...this.state.pos });
          //   break;
          // case 'cursorUp':
          //   eventEmitter.emit('cursorUp', { ...this.state.pos });
          //   break;
          // case 'cursorMove':
          //   // distance += Math.hypot(inputEvent.e.movementX, inputEvent.e.movementY); // DEBUG
          //   const { x, y } = inputEvent.e;
          //   this.state.pos.x = x;
          //   this.state.pos.y = y;
          //   // if (this.state.cursorDragging) {
          //     const { minDistance } = config.cursor; 
          //     const { movementX, movementY } = inputEvent.e;
          //     const dist = Math.hypot(movementX, movementY);
          //     if (dist > minDistance) {
          //       const sampleCount = Math.floor(dist / minDistance);
          //       const minDistPerDist = minDistance / dist;
          //       const prevX = x - movementX;
          //       const prevY = y - movementY;
          //       for (let i = 1; i <= sampleCount; i += 1) {
          //         // if (!this.state.cursorDragging) return; // in case a previous iteration in the below 'cursorDragMoveInterp' triggers a 'cursorDragStopped'
          //         const percDist = minDistPerDist * i;
          //         eventEmitter.emit('cursorDragMovedInterp', {
          //           pos: { x: percDist * movementX + prevX, y: percDist * movementY + prevY },
          //           time: inputEvent.e.timeStamp
          //         });
          //       }
          //     }
          //     // if (!this.state.cursorDragging) return; // in case the above 'cursorDragMoveInterp' triggers a 'cursorDragStopped'
          //     eventEmitter.emit('cursorDragMoved', { pos: { x, y }, time: inputEvent.e.timeStamp });
          //     // TODO maybe have this alternate with cursorDragMoved
          //     eventEmitter.emit('cursorMoved', { pos: { x, y } });
          //     // }
          //   break;
          // case 'keyDown':
          //   if (!this.state.keysDown.includes(inputEvent.e.key)) {
          //     this.state.keysDown.push(inputEvent.e.key);
          //     eventEmitter.emit('keyDown', {
          //       key: inputEvent.e.key,
          //       keysDown: this.state.keysDown,
          //       cursorPos: { ...this.state.pos }
          //     });
          //   }
          //   break;
          // case 'keyUp':
          //   this.state.keysDown.splice(this.state.keysDown.indexOf(inputEvent.e.key), 1);
          //   break;
          case 'leftArrowDown': {
            eventEmitter.emit('playerMoveLeftStarted');
          } break;
          case 'upArrowDown': {
            eventEmitter.emit('playerMoveUpStarted');
          } break;
          case 'rightArrowDown': {
            eventEmitter.emit('playerMoveRightStarted');
          } break;
          case 'downArrowDown': {
            eventEmitter.emit('playerMoveDownStarted');
          } break;

          case 'leftArrowUp': {
            eventEmitter.emit('playerMoveLeftEnded');
          } break;
          case 'upArrowUp': {
            eventEmitter.emit('playerMoveUpEnded');
          } break;
          case 'rightArrowUp': {
            eventEmitter.emit('playerMoveRightEnded');
          } break;
          case 'downArrowUp': {
            eventEmitter.emit('playerMoveDownEnded');
          } break;
        }
      });
      // this.state.velocity = distance / lastFrameTime; // DEBUG
    }

    this.eventListeners = [
      // { event: 'cursorDragStopped', listener: () => {this.state.cursorDragging = false;} },
      { event: 'drawFinished', listener: this.update },
    ];

    // this.debugItems = [
      // { valuePrinter: () => `x: ${this.state.pos.x}` },
      // { valuePrinter: () => `y: ${this.state.pos.y}` },
    // //   { valuePrinter: () => `velocity: ${Math.round(this.state.velocity * 1000)}`, updateRate: 250 },
    // //   { valuePrinter: () => {
    // //     let text = 'keys down: ';
    // //     this.state.keysDown.forEach(key => text += `${key}, `);
    // //     return text;
    // //   } },
    //   { valuePrinter: () => `mouse updates per frame: ${this.inputEventsFromLastFrame}` }
    // ];

  }
}

export default new PlayerInput();
