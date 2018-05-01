define([
  'require',
  'chai',
  'FrameRendererBuilder',
  'FrameRenderer',
  'RandomizedFrameRenderStrategy'
], (
  require,
  chai,
  FrameRendererBuilder,
  FrameRenderer,
  RandomizedFrameRenderStrategy
) => {
  describe('constructor()', () => {
    describe('plain constructor call', () => {
      it("shouldn't throw any exception", () => {
        expect(() => {
          new FrameRendererBuilder();
        }).to.not.throw();
      });
    });
  });

  describe('build()', () => {
    describe('default FrameRenderer', () => {
      const sut = new FrameRendererBuilder();
      const result = sut.build();

      it('should return the defined object', () => {
        expect(result instanceof FrameRenderer).to.be.true;
      });
    });

    describe('setText', () => {
      const sut = new FrameRendererBuilder();
      const result = sut.setTextDataSource('abc').build();

      it('should return the defined object', () => {
        expect(result instanceof FrameRenderer).to.be.true;
      });

      it('text value should get set', () => {
        //expect(result.getText()).to.equal('abc');
      });
    });

    describe('setRenderStrategy', () => {
      const sut = new FrameRendererBuilder();
      const result = sut
        .setRenderStrategy(new RandomizedFrameRenderStrategy())
        .build();

      it('should return the defined object', () => {
        expect(
          result.getFrameRenderStrategy() instanceof
            RandomizedFrameRenderStrategy
        ).to.be.true;
      });
    });

    describe('setOptions noiseratio', () => {
      const sut = new FrameRendererBuilder();
      const result = sut.setOptions({ noiseratio: 0.23 }).build();

      it('should update the value for the given key', () => {
        expect(result.getOptions().noiseratio).to.equal(0.23);
      });
    });
  });
});
