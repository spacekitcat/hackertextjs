define(['require', 'chai', 'WidgetBuilder', 'Widget'], function(
  require,
  chai,
  WidgetBuilder,
  Widget
) {
  var should = chai.should();
  var expect = chai.expect;

  var node_stub = sinon.stub($('div'));

  describe('constructor()', () => {
    describe('plain constructor call', () => {
      it("shouldn't throw any exception", () => {
        expect(() => {
          new WidgetBuilder(node_stub);
        }).to.not.throw();
      });
    });
  });

  describe('build()', () => {
    describe('default Widget', () => {
      var sut = new WidgetBuilder(node_stub);
      var result = sut.build();

      it('should return the defined object', () => {
        expect(result instanceof Widget).to.be.true;
      });
    });

    describe('setTextDataSource', () => {
      var sut = new WidgetBuilder(node_stub);
      var result = sut.setTextDataSource('abc').build();

      it('should return the defined object', () => {
        expect(result instanceof Widget).to.be.true;
      });
    });

    describe('setRowCount', () => {
      var sut = new WidgetBuilder(node_stub);
      var result = sut.setRowCount(45).build();

      it('rowcount value should get set', () => {
        expect(result.getRowCount()).to.equal(45);
      });
    });

    describe('setTargetNode', () => {
      var sut = new WidgetBuilder(node_stub);
      var new_target_node_stub = sinon.stub($('div'));
      var result = sut.setTargetNode(new_target_node_stub).build();

      it('target node should get set', () => {
        expect(result.getTargetNode()).to.equal(new_target_node_stub);
      });
    });
  });
});
