export default class Color {
  constructor({ r, g, b, a = 1, h = null }) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.h = h; // hue
    this.html = `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  set({ r, g, b, a }) {
    // TODO split this up into different methods maybe?
    if (r != undefined) this.r = r;
    if (g != undefined) this.g = g;
    if (b != undefined) this.b = b;
    if (a != undefined) this.a = a;
    this.html = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  copy() {
    return {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.a
    };
  }
}
