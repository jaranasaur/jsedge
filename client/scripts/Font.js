export default class Font {
  constructor({ size, style }) {
    this.size = size;
    this.style = style;
    this.fontString = `${this.size}px ${this.style}`;
  }

  setSize(size) {
    this.size = size;
    this.fontString = `${this.size}px ${this.style}`;
  }
}
