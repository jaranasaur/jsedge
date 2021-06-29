import Drawable from './Drawable.js';
import canvasWrapper from './CanvasWrapper.js';

export default class Text extends Drawable {
  constructor(params) {
    super(params);
    this.text = params.text;
    this.font = params.font;

    this.draw = ({ ctx }) => {
      ctx.font = this.font.fontString;
      ctx.fillStyle = this.color.html;
      ctx.fillText(this.text, this.pos.x, this.pos.y);
    }
  }

  measureText() {
    canvasWrapper.ctx.font = this.font.fontString;
    return canvasWrapper.ctx.measureText(this.text).width;
  }
}