import Timer from './Timer.js';

export default class Animation extends Timer {
  constructor(params) {
    super(params);
    this.startVal = params.startVal;
    this.endVal = params.endVal;
    this._dist = this.endVal - this.startVal;
    this.equation = params.equation;
    this.onTick = (perc) => {
      params.onTick(this._dist * this.equation(perc) + this.startVal);
    };
  }

  resetValues(startVal, endVal) {
    this.startVal = startVal;
    this.endVal = endVal;
    this._dist = this.endVal - this.startVal;
  }

  setOnTick(newOnTick) {
    this.onTick = (perc) => {
      newOnTick(this._dist * this.equation(perc) + this.startVal);
    }
  }
}