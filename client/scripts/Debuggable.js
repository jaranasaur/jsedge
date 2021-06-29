import debugPrinter from './DebugPrinter.js';

export default function debuggableMixin(BaseClass) {
  return class extends BaseClass {
    constructor(params) {
      super(params);
      this.debugItems = []; // { valuePrinter: () => {}, updateRate: 0 }
    }

    init() {
      super.init();

      // setup debug items
      this.debugItems.forEach((debugItem) => {
        debugPrinter.addDebugItem(debugItem.valuePrinter, debugItem.updateRate);
      });
    }

    destruct() {
      super.destruct();

      // remove debug items
      this.debugItems.forEach((debugItem) => {
        debugPrinter.removeDebugItem(debugItem.valuePrinter);
      });
    }
  }
}