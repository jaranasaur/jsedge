import Drawable from './Drawable.js';

export default class DebugText extends Drawable {
  constructor(params) {
    super(params);
    this.text;
    this.valuePrinter = params.valuePrinter;
    this.updateRate = params.updateRate;
    this.elapsedTime = 0;
    this.font = params.font;

    this.draw = ({ ctx, lastFrameTime }) => {
      if (this.elapsedTime >= this.updateRate) {
        this.elapsedTime = 0;
        this.text = this.valuePrinter();
      } else {
        this.elapsedTime += lastFrameTime;
      }
      ctx.font = this.font;
      ctx.fillStyle = this.color.html;
      ctx.fillText(this.text, this.pos.x, this.pos.y);
    }
  }
}