import DebugText from './DebugText.js';
import Color from './Color.js';

class DebugPrinter {
  constructor() {
    this.debugItems = new Map();
  }

  addDebugItem(valuePrinter, updateRate = 0) {
    const debugText = new DebugText({
      color: new Color({ r: 0, g: 51, b: 187 }),
      font: '28px Arial',
      pos: {
        x: 10,
        y: this.debugItems.size * 20 + 100,
      },
      valuePrinter,
      updateRate,
    });

    this.debugItems.set(valuePrinter, debugText);
    debugText.init();
  }

  // removeDebugItem(valuePrinter) {
  //   const debugText = this.debugItems.get(valuePrinter);
  //   if (!debugText) return;
  //   this.debugItems.delete(valuePrinter);
  //   debugText.destruct();
  // }
}

export default new DebugPrinter();