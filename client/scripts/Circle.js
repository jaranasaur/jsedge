import Drawable from './Drawable.js';
import Helper from './Helper.js';
import Config from './Config.js';

export default class Circle extends Drawable {
  constructor(params) {
    super(params);
    this.drawStyle = Helper.drawFill;
    this.draw = ({ ctx }) => {
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.size.r, 0, Config.math.pi2);
      this.drawStyle(this, ctx);
    };
    this.checkHit = ({ pos }) => {
      return Math.hypot(pos.x - this.pos.x, pos.y - this.pos.y) < this.size.r;
    };
  }
}