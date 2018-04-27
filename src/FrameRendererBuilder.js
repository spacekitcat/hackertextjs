define('FrameRendererBuilder', ['FrameRenderer'], FrameRenderer =>
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
