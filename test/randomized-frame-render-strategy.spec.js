define(['require', 'chai', 'StringIterator', 'RandomizedFrameRenderStrategy'], (
  require,
  chai,
  StringIterator,
  RandomizedFrameRenderStrategy
) => {
  describe('render', () => {
    let random_stub;

    before(() => {
      random_stub = sinon.stub(Math, 'random').returns(0.4);
    });

    after(() => {
      random_stub.restore();
    });

    it('should generate only from the data source where Math.random is locked to 0.4 and the noise ratio is 0.3', () => {
      var sut = new RandomizedFrameRenderStrategy();

      sut.setFrameSize(17);
      sut.setOptionValue('noiseratio', 0.3);
      sut.setTextDataSource(new StringIterator('PINK_FLOYD_'));

      expect(sut.render(17)).to.equal('PINK_FLOYD_PINK_F');
    });

    it('should generate only spaces where Math.random is locked to 0.4 and the noise ratio is 0.4', function() {
      var sut = new RandomizedFrameRenderStrategy();
      sut.setFrameSize(13);
      sut.setOptionValue('noiseratio', 0.4);
      sut.setTextDataSource(new StringIterator('PINK_FLOYD_'));

      expect(sut.render(13)).to.equal('_____________');
    });

    describe("where the data source doesn't provide getNext", function() {
      it('should throw a clear exception', function() {
        var sut = new RandomizedFrameRenderStrategy();
        sut.setFrameSize(12);
        sut.setOptionValue('noiseratio', 0.5);

        // Bof! No data source!?

        expect(() => {
          sut.render(12);
        }).to.throw(
          'Data source object must provide an implementation of getNext.'
        );
      });
    });
  });

  describe('getFrameSize()', function() {
    it('should default to 500', function() {
      var sut = new RandomizedFrameRenderStrategy();
      expect(sut.getFrameSize()).to.equal(500);
    });

    it('should return updated framesize after its set', function() {
      var sut = new RandomizedFrameRenderStrategy();
      sut.setFrameSize(340);
      expect(sut.getFrameSize()).to.equal(340);
    });
  });
});
