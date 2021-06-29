export default class Queue {
  constructor() {
    this._values = [];
  }
  
  add(value) {
    this._values.push(value);
  }

  shiftEach(callback) {
    while (this._values.length > 0) {
      callback(this._values.shift());
    }
  }
}