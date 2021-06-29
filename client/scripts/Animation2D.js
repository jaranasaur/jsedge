import Timer from './Timer.js';

export default class Animation2D extends Timer {
  constructor(params) {
    super(params);
    this.startVal = { x: params.startVal.x, y: params.startVal.y };
    this.endVal = { x: params.endVal.x, y: params.endVal.y};
    this._distX = this.endVal.x - this.startVal.x;
    this._distY = this.endVal.y - this.startVal.y
    this.equation = params.equation;
    this.onTick = (perc) => {
      params.onTick({
        x: this._distX * this.equation(perc) + this.startVal.x,
        y: this._distY * this.equation(perc) + this.startVal.y
      });
    };
  }

  resetValues(startVal, endVal) {
    this.startVal = { x: startVal.x, y: startVal.y };
    this.endVal = { x: endVal.x, y: endVal.y};
    this._distX = this.endVal.x - this.startVal.x;
    this._distY = this.endVal.y - this.startVal.y
  }
}