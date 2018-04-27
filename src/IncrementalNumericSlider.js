define('IncrementalNumericSlider', [], () =>
  class IncrementalNumericSlider {
    // Works to a maximum accuracy of six decimal places.
    // See unit test for a better picture of stable
    // operating conditions.
    constructor(start, end, step) {
      if (start === null) {
        throw new Error('Start value cannot be null.');
      }

      if (end === null) {
        throw new Error('End value cannot be null.');
      }

      if (step === null) {
        throw new Error('Step value cannot be null.');
      }

      const endToStartGap = Math.abs(end - start);

      if (step > endToStartGap) {
        throw new Error('Step cannot be more than the overall value range.');
      }

      this.start = start;
      this.end = end;
      this.step = step;

      this.currentValue = this.start;
      this.lastValue = this.currentValue;
    }

    static calculateSingleUnitOfStep(step) {
      // We have to subtract a single unit of 'this.step' from
      // 'this.step' when looping back to the beginning of the
      // range. One unit is one singular value for the most
      // significant digit, ie:
      //
      // 300 = 1, 10 = 1, 6 = 1, 0.5 = 0.1, 0.02 = 0.01
      return 10 ** Math.floor(Math.log10(step));
    }

    calculateOverflow(current, step) {
      let overflow = current + step;
      overflow -= this.end;

      // Dealing with floating point step values above will cause
      // undesired rounding issues. ie, the following will return
      // a clearly underdisred result:
      //
      // (1.0 + 0.1) - 1.0 == 0.10000000000000009
      // rounding to 6 decimal places is more than enough for this
      // application.
      return overflow.toFixed(6);
    }

    doIncrement() {
      this.currentValue = this.currentValue + this.step;
    }

    doOverflow(overflow) {
      // Incrementing past this.end uses one unit of this.step, so
      // ensure it isn't added to this.start after overflowing.
      const increment = overflow - IncrementalNumericSlider.calculateSingleUnitOfStep(this.step);

      this.currentValue = this.start + increment;
    }

    getNext() {
      // This always return this.currentValue before incrementing.
      // With that, the way its written should be self explanatory.
      this.lastValue = this.currentValue;

      const overflow = this.calculateOverflow(this.currentValue, this.step);
      if (overflow > 0) {
        this.doOverflow(overflow);
      } else {
        this.doIncrement();
      }

      return this.lastValue;
    }

    getStartAt() {
      return this.start;
    }

    getEndAt() {
      return this.end;
    }

    getStepWith() {
      return this.step;
    }

    reset() {
      this.currentValue = this.start;
    }
  });
