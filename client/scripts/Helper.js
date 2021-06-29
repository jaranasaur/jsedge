import Color from './Color.js';
import Config from './Config.js';
import canvasWrapper from './CanvasWrapper.js';

export default class Helper {
  /**
   * Returns a random integer less than or equal to 'maxInt' and greater than or equal to zero
   * @param {number} maxInt 
   * @returns {number}
   */
  static randInt(maxInt) {
    return Math.round(Math.random() * maxInt);
  }

  static drawFill(drawable, ctx) {
    ctx.fillStyle = drawable.color.html;
    ctx.fill();
  }

  static drawStroke(drawable, ctx) {
    ctx.strokeStyle = drawable.color.html;
    ctx.lineWidth = drawable.lineWidth;
    ctx.stroke();
  }

  static drawFillRect(drawable, ctx) {
    ctx.fillStyle = drawable.color.html;
    ctx.fillRect(drawable.pos.x, drawable.pos.y, drawable.size.w, drawable.size.h);
  }

  static drawFillRadGradRect(drawable, ctx) {
    const gradient = ctx.createRadialGradient(
      drawable.gradient.x0,
      drawable.gradient.y0,
      drawable.gradient.r0,
      drawable.gradient.x1,
      drawable.gradient.y1,
      drawable.gradient.r1,
    );

    gradient.addColorStop(0, drawable.color.html);
    gradient.addColorStop(1, drawable.gradient.gradStopColor.html);

    ctx.fillStyle = gradient;
    ctx.fillRect(drawable.pos.x, drawable.pos.y, drawable.size.w, drawable.size.h);
  }

  static drawStrokeRect(drawable, ctx) {
    ctx.strokeStyle = drawable.color.html;
    ctx.lineWidth = drawable.lineWidth;
    ctx.strokeRect(drawable.pos.x, drawable.pos.y, drawable.size.w, drawable.size.h);
  }

  // TODO possibly implement alternate formula from wikipedia
  static hslToRgbColor(h, s, l) {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const hP = h/60;
    const x = c * (1 - Math.abs(hP % 2 - 1));
    let r, g, b;
    switch (true) {
      case hP >= 0 && hP <= 1:
        r = c;
        g = x;
        b = 0;
        break;
      case hP >= 1 && hP <= 2:
        r = x;
        g = c;
        b = 0;
        break;
      case hP >= 2 && hP <= 3:
        r = 0;
        g = c;
        b = x;
        break;
      case hP >= 3 && hP <= 4:
        r = 0;
        g = x;
        b = c;
        break;
      case hP >= 4 && hP <= 5:
        r = x;
        g = 0;
        b = c;
        break;
      case hP >= 5 && hP <= 6:
        r = c;
        g = 0;
        b = x;
        break;
      default: 
        r = 0;
        g = 0;
        b = 0;
    }

    const m = l - c/2;

    return new Color({
      r: Math.round((r+m) * 255),
      g: Math.round((g+m) * 255),
      b: Math.round((b+m) * 255),
      h
    });
  }

  static bubbleHueAdd(hue) {
    hue += Config.bubble.hueStep;
    if (hue > 360) hue = hue - 360;
    return hue;
  }

  static pixelPosToUnits(posPix) {
    return {
      x: (posPix.x - canvasWrapper.halfWidth) / canvasWrapper.sizes.pixelsPerUnit,
      y: (posPix.y - canvasWrapper.halfHeight) / canvasWrapper.sizes.pixelsPerUnit,
    };
  }
}