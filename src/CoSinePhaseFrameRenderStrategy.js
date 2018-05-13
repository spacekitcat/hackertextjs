define('CoSinePhaseFrameRenderStrategy', [
  'ValidatingPropertyObject'
], ValidatingPropertyObject =>
  class CoSinePhaseFrameRenderStrategy {
    constructor(options) {
      this.props = new ValidatingPropertyObject({
        noiseratio: 0.5,
        dynamicnoiseratio: false
      });

      this.currentFrame = '';
      this.framesize = 500;
      this.setOptions(options);
    }

    getOptions() {
      return this.props;
    }

    render(framesize) {
      let returnStr = '';
      if (this.dataSource === null || this.dataSource === undefined) {
        throw new Error(
          'Data source object must provide an implementation of getNext.'
        );
      }

      const activeNoiseRatio = Math.abs(
        Math.cos(0.5 * 3.141 * 2 * new Date().getTime() + 1)
      );

      for (let i = 0; i < framesize; i += 1) {
        if (Math.random() > activeNoiseRatio) {
          returnStr += this.dataSource.getNext();
        } else {
          returnStr += '_';
        }
      }

      return returnStr;
    }

    // Updates and returns the current frame using the EntryGenerator object
    computeNextFrame() {
      if (this.dataSource === null || this.dataSource === undefined) {
        throw new Error(
          'Data source object must provide an implementation of getNext.'
        );
      }

      return this.render(this.getFrameSize());
    }

    reset() {
      this.currentFrame = '';
    }

    getOptionValue(key) {
      return this.props.getValue(key);
    }

    setOptions(options) {
      if (options !== null && options !== undefined) {
        Object.keys(options).array.forEach(element => {
          this.props.setValue(element, options[element]);
        });
      }
    }

    setOptionValue(key, value) {
      this.props.setValue(key, value);
    }

    setTextDataSource(dataSource) {
      this.dataSource = dataSource;
    }

    getTextDataSource() {
      return this.dataSource;
    }

    setFrameSize(framesize) {
      this.framesize = framesize;
    }

    getFrameSize() {
      return this.framesize;
    }
  });
