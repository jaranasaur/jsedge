import Entity from './Entity.js';
import eventEmitter from './EventEmitter.js';
import canvasWrapper from './CanvasWrapper.js';
import playerInput from './PlayerInput.js';

// imported stuff used in the example
import PlayerCharacter from './PlayerCharacter.js';
import Text from './Text.js';
import Font from './Font.js';
import Color from './Color.js';
import Animation from './Animation.js';

const PI_HALF = Math.PI / 2;
const PI_2    = Math.PI * 2;

// class Application extends debuggableMixin(Entity) {
class Application extends Entity {
  constructor() {
    super();

    this.playerCharacter = null;
    this.hudText = null;
    this.hudTextAnimation = null;

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


// -----------------------------------> START EXAMPLE CODE
    // example player object, which is just a dark purple square 
    this.playerCharacter = new PlayerCharacter({
      size: { w: 75, h: 75 },
      pos: { x: 0, y: 0 },
      color: new Color({ r: 100, g: 0, b: 100 }),
    });
    this.playerCharacter.init();
    // set nicer player starting position (center it up on screen a bit better)
    this.playerCharacter.pos.x = canvasWrapper.ctx.canvas.width/2  - this.playerCharacter.size.w/2;
    this.playerCharacter.pos.y = canvasWrapper.ctx.canvas.height*.333 - this.playerCharacter.size.h/2;

    // some example HUD text
    this.hudText = new Text({
      text: 'Move the square around with the arrow keys',
      pos: { x: 0, y: 0 },
      font: new Font({ size: 35, style: 'Arial' }),
      color: new Color({ r: 0, g: 50, b: 75 }),
    });
    this.hudText.init();
    // position the text more nicely
    this.hudText.pos.x = canvasWrapper.ctx.canvas.width/2 - this.hudText.measureText()/2; // measureText() currently just gets the width of the text in pixels
    this.hudText.pos.y = canvasWrapper.ctx.canvas.height*.75 - this.hudText.font.size/2;

    // animate the HUD text a bit, a nice sine wave bob up and down
    this.hudTextAnimation = new Animation({
      maxDur: 2000,
      startVal: this.hudText.pos.y,
      endVal: this.hudText.pos.y + 30, // sine wave will offset the text y position by 30 pixels
      onTick: (val) => {this.hudText.pos.y = val;},
      equation: (t) => Math.sin(PI_2 * t + PI_HALF)/2 + .5, // this equation formats our sine wave nicely for the animation loop
      repeatOnElapse: true, // loop the animation
      destructOnElapse: false, // don't destroy the animation when its timer elapses once
    });
    this.hudTextAnimation.init();
// ----------------------------------> END EXAMPLE CODE

  }
}

export default new Application();