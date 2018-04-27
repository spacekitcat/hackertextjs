define([
  'require',
  'chai',
  'Widget',
  'StringIterator',
  'FrameRenderer'
], function(require, chai, Widget, StringIterator, FrameRenderer) {
  var should = chai.should();
  var expect = chai.expect;

  var jquery_node = $('<div>');
  var jquery_node_html_spy = sinon.spy(jquery_node, 'html');

  var render_stub = sinon.createStubInstance(FrameRenderer);

  describe('constructor()', () => {
    describe('valid object parameters for target_node and rendereder', () => {
      it("shouldn't throw any exception", () => {
        expect(() => {
          new Widget(jquery_node, render_stub);
        }).to.not.throw();
      });

      it("shouldn't return correct renderer instance", () => {
        var sut = new Widget(jquery_node, render_stub);

        expect(sut.getRenderer()).to.deep.equal(render_stub);
      });
    });

    describe('null target_node parameter', () => {
      it('should throw a TypeError exception', () => {
        expect(() => {
          new Widget(null, render_stub);
        }).to.throw(TypeError, /jQuery/);
      });
    });

    describe('undefined target_node parameter', () => {
      it('should throw a TypeError exception', () => {
        expect(() => {
          new Widget(undefined, render_stub);
        }).to.throw(TypeError, /jQuery/);
      });
    });

    describe('target_node parameter with the wrong type', () => {
      it('should throw a TypeError exception', () => {
        expect(() => {
          new Widget({}, render_stub);
        }).to.throw(TypeError, /jQuery/);
      });
    });

    describe('null renderer parameter', () => {
      it('should throw a TypeError exception', () => {
        expect(() => {
          new Widget(jquery_node, null);
        }).to.throw(TypeError, /FrameRenderer/);
      });
    });

    describe('undefined renderer parameter', () => {
      it('should throw a TypeError exception', () => {
        expect(() => {
          new Widget(jquery_node, undefined);
        }).to.throw(TypeError, /FrameRenderer/);
      });
    });

    describe('renderer parameter with the wrong type', () => {
      it('should throw a TypeError exception', () => {
        expect(() => {
          new Widget(jquery_node, {});
        }).to.throw(TypeError, /FrameRenderer/);
      });
    });
  });

  describe('paint()', () => {
    describe('standrd call with standard params', () => {
      var sut = new Widget(jquery_node, render_stub);

      sut.paint();

      it('should make 1 FrameRenderer call to computeNextFrame()', () => {
        expect(render_stub.computeNextFrame.called).to.be.true;
      });

      it('should make 1 Node call to html()', () => {
        expect(jquery_node_html_spy.called).to.be.true;
      });
    });
  });

  describe('getRowCount()', () => {
    describe('default value', () => {
      it('returns 42', () => {
        var sut = new Widget(jquery_node, render_stub);
        expect(sut.getRowCount()).to.equal(42);
      });
    });
  });

  describe('setRowCount()', () => {
    describe('undefined value', () => {
      it('throws exception', () => {
        var sut = new Widget(jquery_node, render_stub);

        expect(() => {
          sut.setRowCount();
        }).to.throw(TypeError, /rowcount/);
      });
    });

    describe('null value', () => {
      it('throws exception', () => {
        var sut = new Widget(jquery_node, render_stub);
        expect(() => {
          sut.setRowCount(null);
        }).to.throw(TypeError, /rowcount/);
      });
    });

    describe('negative value', () => {
      it('throws exception', () => {
        var sut = new Widget(jquery_node, render_stub);
        expect(() => {
          sut.setRowCount(-1);
        }).to.throw(RangeError, /rowcount/);
      });
    });

    describe('zero', () => {
      it('throws exception', () => {
        var sut = new Widget(jquery_node, render_stub);
        expect(() => {
          sut.setRowCount(0);
        }).to.throw(RangeError, /rowcount/);
      });
    });

    describe('positive integer', () => {
      it('sets value', () => {
        var sut = new Widget(jquery_node, render_stub);
        sut.setRowCount(67);
        expect(sut.getRowCount()).to.equal(67);
      });
    });
  });

  describe('notify()', () => {
    describe('null subject object', () => {
      var sut = new Widget(jquery_node, render_stub);

      // Message params are only optional.
      it("shouldn't throw any exceptions", () => {
        expect(() => {
          sut.notify(null);
        }).to.not.throw();
      });

      it("shouldn't throw any exceptions", () => {
        sut.notify(null);
      });
    });
  });
});
