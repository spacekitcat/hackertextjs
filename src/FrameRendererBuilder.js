define('FrameRendererBuilder', [
  'FrameRenderer',
  'SinePhaseFrameRenderStrategy'
], (FrameRenderer, SinePhaseFrameRenderStrategy) =>
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
      if (copy.getFrameRenderStrategy() === undefined) {
        const renderStrategy = new SinePhaseFrameRenderStrategy();
        copy.setFrameRenderStrategy(renderStrategy);
      }
      // const renderStrategy = new SinePhaseFrameRenderStrategy();
      copy.getFrameRenderStrategy().setTextDataSource(copy.getTextDataSource());
      // renderStrategy.setOptionValue('dynamicnoiseratio', true);
      // copy.setFrameRenderStrategy(renderStrategy);
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

    setRenderStrategy(renderStrategy) {
      this.instance.setFrameRenderStrategy(renderStrategy);
      return this;
    }
  });
