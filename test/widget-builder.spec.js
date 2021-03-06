define([
  'require',
  'chai',
  'WidgetBuilder',
  'Widget',
  'RandomizedFrameRenderStrategy',
  'TextDataSource'
], (
  require,
  chai,
  WidgetBuilder,
  Widget,
  RandomizedFrameRenderStrategy,
  TextDataSource
) => {
  const nodeStub = sinon.stub($('div'));

  describe('constructor()', () => {
    describe('plain constructor call', () => {
      it("shouldn't throw any exception", () => {
        expect(() => {
          new WidgetBuilder(nodeStub);
        }).to.not.throw();
      });
    });
  });

  describe('build()', () => {
    describe('default Widget', () => {
      const sut = new WidgetBuilder(nodeStub);
      const result = sut.build();

      it('should return the defined object', () => {
        expect(result instanceof Widget).to.be.true;
      });
    });

    describe('setTextDataSource', () => {
      const sut = new WidgetBuilder(nodeStub);
      const result = sut.setTextDataSource('abc').build();

      it('should return the defined object', () => {
        expect(result instanceof Widget).to.be.true;
      });
    });

    describe('setRowCount', () => {
      const sut = new WidgetBuilder(nodeStub);
      const result = sut.setRowCount(45).build();

      it('rowcount value should get set', () => {
        expect(result.getRowCount()).to.equal(45);
      });
    });

    describe('setFrameRenderStrategy', () => {
      let sut;
      let result;
      before(() => {
        sut = new WidgetBuilder(nodeStub);
        var renderStrategy = new RandomizedFrameRenderStrategy();
        renderStrategy.setTextDataSource(new TextDataSource('aaa'));
        result = sut.setFrameRenderStrategy(renderStrategy).build();
      });

      it('render strategy should get set', () => {
        expect(
          result.getRenderer().getFrameRenderStrategy() instanceof
            RandomizedFrameRenderStrategy
        ).to.be.true;
      });
    });

    describe('setTargetNode', () => {
      const sut = new WidgetBuilder(nodeStub);
      const newTargetNodeStub = sinon.stub($('div'));
      const result = sut.setTargetNode(newTargetNodeStub).build();

      it('target node should get set', () => {
        expect(result.getTargetNode()).to.equal(newTargetNodeStub);
      });
    });
  });
});
