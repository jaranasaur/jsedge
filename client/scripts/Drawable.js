import Entity from './Entity.js';
import Color from './Color.js';
import canvasWrapper from './CanvasWrapper.js';

export default class Drawable extends Entity {
  constructor({ color = new Color({ r: 0, g: 0, b: 0 }), size, pos, lineWidth, zIndex=0 } = {}) {
    super();
    this.color = color;
    this.size = size;
    this.pos = pos;
    this.lineWidth = lineWidth;
    this.zIndex = zIndex;
    this.draw = (ctx) => {};
    this.checkHit = (p) => false;
  }

  show() {
    canvasWrapper.addDrawer(this.zIndex, this.draw);
    this.eventListeners.forEach((listener) => {
      eventEmitter.on(listener.event, listener.listener);
    });
  }

  hide() {
    canvasWrapper.removeDrawer(this.draw);
    this.eventListeners.forEach((listener) => {
      eventEmitter.off(listener.event, listener.listener);
    });
  }

  init() {
    super.init();
    canvasWrapper.addDrawer(this.zIndex, this.draw);
  }

  destruct() {
    super.destruct();
    canvasWrapper.removeDrawer(this.draw);
  }
}