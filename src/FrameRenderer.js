define('FrameRenderer', [], () =>
    class FrameRenderer {
      static isValidKey(validOptions, key) {
        return Object.keys(validOptions).includes(key);
      }

      static validateCustomOptions(validOptions, customOptions) {
        // Curry key check function while 'this' still === FrameRenderer object
        const keyValidator = key => FrameRenderer.isValidKey(validOptions, key);

        // Does every key in customOptions exist in defaultOptions?
        return Object.keys(customOptions).every(keyValidator);
      }

      constructor(options) {
        this.defaultOptions = {
          noiseratio: 0.5,
          dynamicnoiseratio: false,
        };

        this.currentFrame = '';
        this.framesize = 500;
        this.setOptions(options);
      }

      setFrameRenderStrategy(frameRenderStrategyImpl) {
        if (frameRenderStrategyImpl === null || 
            frameRenderStrategyImpl === undefined)
        {

          throw new Error('setFrameRenderStrategy requires the argument frameRenderStrategyImpl');
        }

        if (frameRenderStrategyImpl.render === null || 
            frameRenderStrategyImpl.render === undefined)
        {

          throw new Error('frameRenderStrategyImpl must provide an implementation of render(..)');
        }

        this.frameRenderStrategy = frameRenderStrategyImpl;
      }

      // Returns the options object
      getOptions() {
        return this.options;
      }

      render(framesize) {
        var activeNoiseRatio = this.options.noiseratio;
        if (this.options.dynamicnoiseratio === true) {
          activeNoiseRatio = Math.random();
        }
        var returnstr = '';

        for (var i=0; i<framesize; ++i) {
          if (Math.random() > activeNoiseRatio) {
            returnstr += this.dataSource.getNext();
          } else {
            returnstr += '_';
          }
        }

        return returnstr;
      }
      
      computeNextFrame() {
        if (this.frameRenderStrategy === undefined) {
          return Array(this.getFrameSize() + 1).join('_');
        }

        let activeNoiseRatio = this.options.noiseratio;
        if (this.options.dynamicnoiseratio === true) {
          activeNoiseRatio = Math.random();
        }

        return this.frameRenderStrategy.render(this.getFrameSize());
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
          if (!FrameRenderer.validateCustomOptions(this.defaultOptions, options)) {
            throw new Error('invalid options');
          }

          this.options = Object.assign(this.options, options);
        }
      }

      setOptionValue(key, value) {
        if (key === undefined || key === null) {
          throw new Error('An option key must be provided.');
        }

        if (!FrameRenderer.isValidKey(this.defaultOptions, key)) {
          throw new Error(`invalid option key "${key}"  provided.`);
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
