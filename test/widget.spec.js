define([
  'require',
  'chai',
  'Widget',
  'StringIterator',
  'FrameRenderer'
], () => (require, chai, Widget, StringIterator, FrameRenderer) => {
  const { expect } = chai;

  const jqueryNode = $('<div>');
  const jqueryNodeHTMLSpy = sinon.spy(jqueryNode, 'html');

  const renderStub = sinon.createStubInstance(FrameRenderer);

  describe('constructor()', () => {
    describe('valid object parameters for target_node and rendereder', () => {
      it("shouldn't throw any exception", () => {
        expect(() => {
          new Widget(jqueryNode, renderStub);
        }).to.not.throw();
      });

      it("shouldn't return correct renderer instance", () => {
        const sut = new Widget(jqueryNode, renderStub);

        expect(sut.getRenderer()).to.deep.equal(renderStub);
      });
    });

    describe('null target_node parameter', () => {
      it('should throw a TypeError exception', () => {
        expect(() => {
          new Widget(null, renderStub);
        }).to.throw(TypeError, /jQuery/);
      });
    });

    describe('undefined target_node parameter', () => {
      it('should throw a TypeError exception', () => {
        expect(() => {
          new Widget(undefined, renderStub);
        }).to.throw(TypeError, /jQuery/);
      });
    });

    describe('target_node parameter with the wrong type', () => {
      it('should throw a TypeError exception', () => {
        expect(() => {
          new Widget({}, renderStub);
        }).to.throw(TypeError, /jQuery/);
      });
    });

    describe('null renderer parameter', () => {
      it('should throw a TypeError exception', () => {
        expect(() => {
          new Widget(jqueryNode, null);
        }).to.throw(TypeError, /FrameRenderer/);
      });
    });

    describe('undefined renderer parameter', () => {
      it('should throw a TypeError exception', () => {
        expect(() => {
          new Widget(jqueryNode, undefined);
        }).to.throw(TypeError, /FrameRenderer/);
      });
    });

    describe('renderer parameter with the wrong type', () => {
      it('should throw a TypeError exception', () => {
        expect(() => {
          new Widget(jqueryNode, {});
        }).to.throw(TypeError, /FrameRenderer/);
      });
    });
  });

  describe('paint()', () => {
    describe('standrd call with standard params', () => {
      let sut = new Widget(jqueryNode, renderStub);

      sut.paint();

      it('should make 1 FrameRenderer call to computeNextFrame()', () => {
        expect(renderStub.computeNextFrame.called).to.be.true;
      });

      it('should make 1 Node call to html()', () => {
        expect(jqueryNodeHTMLSpy.called).to.be.true;
      });
    });
  });

  describe('getRowCount()', () => {
    describe('default value', () => {
      it('returns 42', () => {
        let sut = new Widget(jqueryNode, renderStub);
        expect(sut.getRowCount()).to.equal(42);
      });
    });
  });

  describe('setRowCount()', () => {
    describe('undefined value', () => {
      it('throws exception', () => {
        let sut = new Widget(jqueryNode, renderStub);

        expect(() => {
          sut.setRowCount();
        }).to.throw(TypeError, /rowcount/);
      });
    });

    describe('null value', () => {
      it('throws exception', () => {
        let sut = new Widget(jqueryNode, renderStub);
        expect(() => {
          sut.setRowCount(null);
        }).to.throw(TypeError, /rowcount/);
      });
    });

    describe('negative value', () => {
      it('throws exception', () => {
        let sut = new Widget(jqueryNode, renderStub);
        expect(() => {
          sut.setRowCount(-1);
        }).to.throw(RangeError, /rowcount/);
      });
    });

    describe('zero', () => {
      it('throws exception', () => {
        let sut = new Widget(jqueryNode, renderStub);
        expect(() => {
          sut.setRowCount(0);
        }).to.throw(RangeError, /rowcount/);
      });
    });

    describe('positive integer', () => {
      it('sets value', () => {
        let sut = new Widget(jqueryNode, renderStub);
        sut.setRowCount(67);
        expect(sut.getRowCount()).to.equal(67);
      });
    });
  });

  describe('notify()', () => {
    describe('null subject object', () => {
      let sut = new Widget(jqueryNode, renderStub);

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
