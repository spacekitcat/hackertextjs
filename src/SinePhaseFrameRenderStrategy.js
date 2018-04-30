define('SinePhaseFrameRenderStrategy', [], () =>
  class SinePhaseFrameRenderStrategy {
    isValidKey(validOptions, key) {
      return Object.keys(validOptions).includes(key);
    }

    validateCustomOptions(validOptions, customOptions) {
      // Curry key check function while 'this' still === FrameRenderer object
      const keyValidator = key =>
        SinePhaseFrameRenderStrategy.isValidKey(validOptions, key);
      return Object.keys(customOptions).every(
        // Does every key in customOptions exist in defaultOptions?
        keyValidator
      );
    }

    constructor(options) {
      this.defaultOptions = {
        noiseratio: 0.5,
        dynamicnoiseratio: false
      };

      this.currentFrame = '';
      this.framesize = 500;
      this.setOptions(options);
    }

    // Returns the options object
    getOptions() {
      return this.options;
    }

    render(framesize) {
      let returnStr = '';
      if (this.dataSource === null || this.dataSource === undefined) {
        throw new Error(
          'Data source object must provide an implementation of getNext.'
        );
      }

      const activeNoiseRatio = Math.abs(
        Math.sin(1 * 3.141 * 2 * new Date().getTime() + 1)
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
      if (key === undefined || key === null) {
        throw new Error('An option key must be provided.');
      }

      return this.options[key];
    }

    setOptions(options) {
      this.options = Object.assign({}, this.defaultOptions);
      if (options !== null && options !== undefined) {
        if (!this.validateCustomOptions(this.defaultOptions, options)) {
          throw new Error('invalid options');
        }

        this.options = Object.assign(this.options, options);
      }
    }

    setOptionValue(key, value) {
      if (key === undefined || key === null) {
        throw new Error('An option key must be provided.');
      }

      if (!this.isValidKey(this.defaultOptions, key)) {
        throw new Error(`invalid option key ${key} provided.`);
      }

      if (value === undefined || value === null) {
        throw new Error('A value must be provided.');
      }

      this.options[key] = value;
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
