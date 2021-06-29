import eventEmitter from './EventEmitter.js';
import Config from './Config.js';

class CanvasWrapper {
  constructor() {
    this.ctx = null;
    this.lastFrameStartTime = 0;
    this.lastFrameTime = 0;
    this.runTime = 0;

    this.drawQueue = [];

    this.sizes = null;
    this.halfWidth = null;
    this.halfHeight = null;

    this.landscapeOrientation = true; // the window orientation

    this.render = (time) => {
      window.requestAnimationFrame(this.render);
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

      this.lastFrameTime = time - this.lastFrameStartTime;
      this.lastFrameStartTime = time;
      this.runTime = time;

      const drawArgs = { ctx: this.ctx, lastFrameTime: this.lastFrameTime, runTime: this.runTime };
      eventEmitter.emit('drawFinished', drawArgs);

      this.drawQueue.forEach(drawPair => {
        drawPair.drawer(drawArgs);
      });
    }
  }

  init() {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.backgroundColor = '#f1f1f1';
    // canvas.style.cursor = 'crosshair';

    this.ctx = canvas.getContext('2d');
    this.ctx.textBaseline = 'top';
    document.body.appendChild(canvas);

    window.addEventListener('resize', () => {
      const widthChangePerc = window.innerWidth / this.ctx.canvas.width;
      const heightChangePerc = window.innerHeight / this.ctx.canvas.height;

      // check & set orientation
      if (this.landscapeOrientation && window.innerWidth < window.innerHeight) {
        this.landscapeOrientation = false;
      } else if (!this.landscapeOrientation && window.innerWidth >= window.innerHeight) {
        this.landscapeOrientation = true;
      }

      this.ctx.canvas.width = window.innerWidth;
      this.ctx.canvas.height = window.innerHeight;
      this.ctx.textBaseline = 'top';
      this.updateSizesAndPositions();
      eventEmitter.emit('windowResized', { widthChangePerc, heightChangePerc });
      // TODO maybe figure out a better way to do this
      eventEmitter.emit('windowResizeFinished', { widthChangePerc, heightChangePerc });
    });
    
    this.updateSizesAndPositions();

    this.render(0);
  }

  addDrawer(zIndex, drawer) {
    const pair = { zIndex, drawer };
    for (let i = 0; i < this.drawQueue.length; i += 1) {
      if (pair.zIndex <= this.drawQueue[i].zIndex) {
        this.drawQueue.splice(i, 0, pair);
        return;
      }
    }
    this.drawQueue.push(pair);
  }

  removeDrawer(drawer) {
    for (let i = 0; i < this.drawQueue.length; i += 1) {
      if (drawer === this.drawQueue[i].drawer) {
        this.drawQueue.splice(i, 1);
        return;
      };
    }
  }

  updateSizesAndPositions() {
    this.halfWidth = this.ctx.canvas.width / 2;
    this.halfHeight = this.ctx.canvas.height / 2;
    this.sizes = {
      // pixelsPerUnit: pixelsPerUnit,
      lineWidth: Config.globalStyle.lineWidthRatio * this.ctx.canvas.height,
    };
  }
}

export default new CanvasWrapper();