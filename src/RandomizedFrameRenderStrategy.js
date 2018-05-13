define('RandomizedFrameRenderStrategy', [
  'ValidatingPropertyObject'
], ValidatingPropertyObject =>
  class RandomizedFrameRenderStrategy {
    isValidKey(key) {
      return this.props.hasKey(key);
    }

    validateCustomOptions(customOptions) {
      return Object.keys(customOptions).every(
        RandomizedFrameRenderStrategy.isValidKey
      );
    }

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
      if (this.dataSource === null || this.dataSource === undefined) {
        throw new Error(
          'Data source object must provide an implementation of getNext.'
        );
      }

      let activeNoiseRatio = this.props.getValue('noiseratio');
      if (this.props.getValue('dynamicnoiseratio') === true) {
        activeNoiseRatio = Math.random();
      }
      let returnstr = '';

      for (let i = 0; i < framesize; i += 1) {
        if (Math.random() > activeNoiseRatio) {
          returnstr += this.dataSource.getNext();
        } else {
          returnstr += '_';
        }
      }

      return returnstr;
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
      if (key === undefined || key === null) {
        throw new Error('An option key must be provided.');
      }

      return this.options[key];
    }

    setOptions(options) {
      if (options !== null && options !== undefined) {
        if (!this.validateCustomOptions(options)) {
          throw new Error('invalid options');
        }

        Object.keys(options).array.forEach(element => {
          this.props.setValue(element, options[element]);
        });
      }
    }

    setOptionValue(key, value) {
      if (key === undefined || key === null) {
        throw new Error('An option key must be provided.');
      }

      if (!this.isValidKey(key)) {
        throw new Error(`invalid option key ${key} provided.`);
      }

      if (value === undefined || value === null) {
        throw new Error('A value must be provided.');
      }

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
