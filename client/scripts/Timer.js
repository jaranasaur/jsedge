import Entity from './Entity.js';

/**
 * General purpose timer, executes a callback when the specified duration has elapsed
 */
export default class Timer extends Entity {
  /**
   * @param {number} maxDur How long the timer should run; in milliseconds
   * @param {function} [onElapsed] A callback to execute when the timer has finished
   * @param {function} [onTick] A callback to execute every frame
   * @property {number} _curDur The current time that has passed so far
   */
  constructor({ maxDur, onElapsed = () => {}, onTick = () => {}, destructOnElapse = true, repeatOnElapse = false }) {
    super();
    this.maxDur = maxDur;
    this._curDur = 0;
    this.paused = false;
    
    this.tick = () => {};

    this.repeatOnElapse = repeatOnElapse;
    // if timer should repeat, have the onElapsed method reset the timer
    this.onElapsed = !this.repeatOnElapse ? onElapsed : () => {
      onElapsed();
      this.reset();
      this.resume();
    };
    this.onTick = onTick;
    this.destructOnElapse = destructOnElapse; // TODO figure out a better way to handle this, since adding reset, pause, and resume features
  }
  
  init() {
    this.tick = ({ lastFrameTime }) => {
      // TODO maybe figure out a better way to pause without checking every tick
      // TODO _curDur just keeps going up if destrucOnElapse = false
      if (!this.paused) {
        this._curDur += lastFrameTime;
        if (this._curDur < this.maxDur) {
          this.onTick(this._curDur / this.maxDur);
        } else {
          this.paused = true;
          this.onTick(1);
          this.onElapsed();
          if (this.destructOnElapse) this.destruct();
        }
      }
    };
  
    this.eventListeners = [
      { event: 'drawFinished', listener: this.tick },
    ];
    super.init();
  }

  setOnElapsed(newOnElapsed) {
    this.onElapsed = !this.repeatOnElapse ? newOnElapsed : () => {
      newOnElapsed();
      this.reset();
    };
  }

  reset() {
    this._curDur = 0;
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
  }
}