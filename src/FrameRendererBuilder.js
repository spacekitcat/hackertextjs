define('FrameRendererBuilder', ['FrameRenderer', 'RandomizedFrameRenderStrategy'], (FrameRenderer, RandomizedFrameRenderStrategy) =>
  class FrameRendererBuilder {
    constructor() {
      this.reset();
    }

    reset() {
      this.instance = new FrameRenderer();
    }

    build() {
      const copy = this.instance;
      this.reset();
      copy.setOptionValue('dynamicnoiseratio', true);
      const renderStrategy = new RandomizedFrameRenderStrategy();
      renderStrategy.setTextDataSource(copy.getTextDataSource());
      renderStrategy.setOptionValue('dynamicnoiseratio', true);
      copy.setFrameRenderStrategy(renderStrategy);
      return copy;
    }

    setTextDataSource(textDataSource) {
      this.instance.setTextDataSource(textDataSource);
      return this;
    }

    setOptions(options) {
      this.instance.setOptions(options);
      return this;
    }
  });
