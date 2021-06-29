import Entity from './Entity.js';
import Circle from './Circle.js';
import Text from './Text.js';
import Color from './Color.js';
import Font from './Font.js';
import Config from './Config.js';
import Animation from './Animation.js';
import eventEmitter from './EventEmitter.js';

export default class Button extends Entity {
  constructor(params) {
    super();
    this.mouseOver = false;
    this.clicked = false;
    this.drawable = new Circle({ ...params, zIndex: Config.zIndexes.button });

    this.text = new Text({
      text: params.text,
      color: new Color({ r: 255, g: 255, b: 255 }),
      font: new Font({
        size: params.fontSize ? params.fontSize : Config.button.fontToRadiusRatio * params.size.r,
        style: 'Arial'
      }),
      zIndex: Config.zIndexes.buttonText,
    });

    this.text.pos = {
      x: params.pos.x - this.text.measureText()/2,
      y: params.pos.y - this.text.font.size/2,
    };

    this.onClick = params.onClick;

    this.initialR = params.size.r;
    this.initialFontSize = this.text.font.size;

    this.hoverAnim = new Animation({
      maxDur: 150,
      equation: t=>1 - Math.pow(1 - t, 3),
      startVal: this.initialR,
      endVal: this.initialR * Config.button.hoverScale,
      onTick: val=>{this.drawable.size.r = val},
      destructOnElapse: false,
    });
    this.hoverTextAnim = new Animation({
      maxDur: 150,
      equation: t=>1 - Math.pow(1 - t, 3),
      startVal: this.initialFontSize,
      endVal: this.initialFontSize * Config.button.hoverScale,
      onTick: (val) => {
        this.text.font.setSize(val);
        this.text.pos.x = this.drawable.pos.x - this.text.measureText()/2;
        this.text.pos.y = this.drawable.pos.y - this.text.font.size/2;
      },
      destructOnElapse: false,
    });

    this.eventListeners = [
      { event: 'cursorDown', listener: () => {
        if (this.mouseOver) this.clicked = true;
      } },
      { event: 'cursorUp', listener: (e) => {
        if (this.drawable.checkHit({ pos: e })) {
          if (this.clicked) this.onClick();
        }
        this.clicked = false;
      } },
      { event: 'cursorMoved', listener: (e) => {
        if (this.drawable.checkHit(e)) {
          if (!this.mouseOver) {
            this.hoverAnim.reset();
            this.hoverAnim.resetValues(this.drawable.size.r, this.initialR * Config.button.hoverScale);
            this.hoverAnim.resume();
            this.hoverTextAnim.reset();
            this.hoverTextAnim.resetValues(this.text.font.size, this.initialFontSize * Config.button.hoverScale);
            this.hoverTextAnim.resume();
          }
          this.mouseOver = true;
        } else {
          if (this.mouseOver) {
            this.hoverAnim.reset();
            this.hoverAnim.resetValues(this.drawable.size.r, this.initialR);
            this.hoverAnim.resume();
            this.hoverTextAnim.reset();
            this.hoverTextAnim.resetValues(this.text.font.size, this.initialFontSize);
            this.hoverTextAnim.resume();
          }
          this.mouseOver = false;
        }
      } },
    ];
  }

  setSizeAndPos(r, x, y, fontSize) {
    this.initialR = r;
    this.drawable.size.r = r;

    this.drawable.pos.x = x;
    this.drawable.pos.y = y;

    this.initialFontSize = fontSize ? fontSize : Config.button.fontToRadiusRatio * r;
    this.text.font.setSize(this.initialFontSize);
    this.text.pos.x = this.drawable.pos.x - this.text.measureText()/2;
    this.text.pos.y = this.drawable.pos.y - this.text.font.size/2;

    this.hoverAnim.resetValues(this.initialR, this.initialR * Config.button.hoverScale);
    this.hoverTextAnim.resetValues(this.initialFontSize, this.initialFontSize * Config.button.hoverScale);
  }

  show() {
    this.drawable.show();
    this.text.show();
    this.eventListeners.forEach((listener) => {
      eventEmitter.on(listener.event, listener.listener);
    });
  }

  hide() {
    this.drawable.hide();
    this.text.hide();
    this.hoverAnim.pause();
    this.hoverAnim.reset();
    this.hoverTextAnim.pause();
    this.hoverTextAnim.reset();

    this.drawable.size.r = this.initialR;
    this.text.font.setSize(this.initialFontSize);
    this.text.pos.x = this.drawable.pos.x - this.text.measureText()/2;
    this.text.pos.y = this.drawable.pos.y - this.text.font.size/2;
    
    this.eventListeners.forEach((listener) => {
      eventEmitter.off(listener.event, listener.listener);
    });
  }

  init() {
    super.init();
    this.drawable.init();
    this.text.init();
    this.hoverAnim.init();
    this.hoverTextAnim.init();
    this.hoverAnim.pause();
    this.hoverTextAnim.pause();
  }

  destruct() {
    super.destruct();
    this.drawable.destruct();
    this.text.destruct();
    this.hoverAnim.destruct();
    this.hoverTextAnim.destruct();
  }
}