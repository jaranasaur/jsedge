
import Entity from './Entity.js';
import Rect from './Rect.js';
import Color from './Color.js';
import canvasWrapper from './CanvasWrapper.js';

const playerMoveSpeed = 400

export default class PlayerCharacter extends Rect {
  constructor(params) {
    super(params);

    this.movingLeft = false;
    this.movingUp = false;
    this.movingRight = false;
    this.movingDown = false;

    this.eventListeners = [
      { event: 'drawFinished', listener: ({ lastFrameTime }) => {
        lastFrameTime /= 1000;
        if (this.movingLeft)  this.pos.x -= (lastFrameTime * playerMoveSpeed);
        if (this.movingUp)    this.pos.y -= (lastFrameTime * playerMoveSpeed);
        if (this.movingRight) this.pos.x += (lastFrameTime * playerMoveSpeed);
        if (this.movingDown)  this.pos.y += (lastFrameTime * playerMoveSpeed);
      } },

      { event: 'playerMoveLeftStarted', listener: () => {this.movingLeft = true} },
      { event: 'playerMoveUpStarted', listener: () => {this.movingUp = true} },
      { event: 'playerMoveRightStarted', listener: () => {this.movingRight = true} },
      { event: 'playerMoveDownStarted', listener: () => {this.movingDown = true} },

      { event: 'playerMoveLeftEnded', listener: () => {this.movingLeft = false} },
      { event: 'playerMoveUpEnded', listener: () => {this.movingUp = false} },
      { event: 'playerMoveRightEnded', listener: () => {this.movingRight = false} },
      { event: 'playerMoveDownEnded', listener: () => {this.movingDown = false} },
    ];
  }
}