define(['require', 'chai', 'FrameRendererBuilder', 'FrameRenderer'], function(
  require,
  chai,
  FrameRendererBuilder,
  FrameRenderer
) {
  var should = chai.should();
  var expect = chai.expect;

  var node_stub = sinon.stub($('div'));

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
      var sut = new FrameRendererBuilder();
      var result = sut.build();

      it('should return the defined object', () => {
        expect(result instanceof FrameRenderer).to.be.true;
      });
    });

    describe('setText', () => {
      var sut = new FrameRendererBuilder();
      var result = sut.setTextDataSource('abc').build();

      it('should return the defined object', () => {
        expect(result instanceof FrameRenderer).to.be.true;
      });

      it('text value should get set', () => {
        //expect(result.getText()).to.equal('abc');
      });
    });

    describe('setOptions noiseratio', () => {
      var sut = new FrameRendererBuilder();
      var result = sut.setOptions({ noiseratio: 0.23 }).build();

      it('should update the value for the given key', () => {
        expect(result.getOptions().noiseratio).to.equal(0.23);
      });
    });
  });
});
