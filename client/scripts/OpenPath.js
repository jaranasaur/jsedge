import Drawable from './Drawable.js';

export default class OpenPath extends Drawable {
  constructor(params) {
    super(params);
    this.points = [];
    this.draw = ({ ctx }) => {
      if (this.points.length > 0) {
        ctx.strokeStyle = this.color.html;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i += 1) {
          ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.stroke();
      }
    };
  }
}