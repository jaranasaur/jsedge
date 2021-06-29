import Drawable from './Drawable.js';
import Helper from './Helper.js';

export default class Rect extends Drawable {
  constructor(params) {
    super(params);
    this.drawStyle = Helper.drawFillRect;
    this.draw = ({ ctx }) => {
      this.drawStyle(this, ctx);
    };
    this.checkHit = ({ pos }) => {
      const { w, h } = this.size;
      const { x, y } = this.pos;
      return pos.x > x && pos.x < x + w && pos.y > y && pos.y < y + h;
    };
  }
}