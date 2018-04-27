define(['require', 'chai', 'DomInitialiser'], function(
  require,
  chai,
  DomInitialiser
) {
  var should = chai.should();
  var expect = chai.expect;

  describe('constructor()', () => {
    it("shouldn't throw any exception", () => {
      expect(() => {
        new DomInitialiser();
      }).to.not.throw();
    });
  });

  describe('initialiseDomNode()', () => {
    describe('null config object', () => {
      it('should throw TypeError', () => {
        expect(() => {
          DomInitialiser.initialiseDomNode(null);
        }).to.throw(TypeError, /Widget/);
      });
    });

    describe('undeclared widget config object', () => {
      it('should throw TypeError', () => {
        expect(() => {
          DomInitialiser.initialiseDomNode();
        }).to.throw(TypeError, /Widget/);
      });
    });

    describe('htmlId declaration missing from widget config', () => {
      it('should throw TypeError', () => {
        expect(() => {
          DomInitialiser.initialiseDomNode({});
        }).to.throw(TypeError, /htmlId/);
      });
    });

    describe('htmlId declaration is null', () => {
      it('should throw TypeError', () => {
        expect(() => {
          DomInitialiser.initialiseDomNode({ htmlId: null });
        }).to.throw(TypeError, /htmlId/);
      });
    });

    describe('node referenecd by htmlId does not exist in document', () => {
      //var spy = sinon.spy($.prototype, "append");
      it('should throw TypeError', () => {
        expect(() => {
          DomInitialiser.initialiseDomNode({ htmlId: 'hackerTextWidget' });
        }).to.throw(TypeError, /hackerTextWidget/);
      });
    });

    describe('node referenecd by htmlId does not exist in document (is blank string)', () => {
      it('should throw TypeError', () => {
        expect(() => {
          DomInitialiser.initialiseDomNode({ htmlId: '' });
        }).to.throw(TypeError, /cannot be blank/);
      });
    });

    describe('node referenecd by htmlId does not exist in document (is only id selector prefix)', () => {
      it('should throw TypeError', () => {
        expect(() => {
          DomInitialiser.initialiseDomNode({ htmlId: '#' });
        }).to.throw(TypeError, /cannot be blank/);
      });
    });

    describe('node referenecd by htmlId exists in document', () => {
      $('body').append('<div id="aTestWidget"></div>');

      var result = DomInitialiser.initialiseDomNode({ htmlId: 'aTestWidget' });

      it('should return an object that is an instace of jQuery', () => {
        expect(result instanceof jQuery).to.be.true;
      });

      it('should return an object that has the expected selector', () => {
        expect(result[0].id).to.equal('aTestWidget');
      });

      it('should return an object that has the expected selector', () => {
        expect(result.hasClass('hackertext')).to.be.true;
      });
    });

    describe('node referenecd by htmlId exists in document, but contains id selector prefix', () => {
      $('body').append('<div id="aTestWidget2"></div>');

      var result = DomInitialiser.initialiseDomNode({
        htmlId: '#aTestWidget2'
      });

      it('should return an object that is an instace of jQuery', () => {
        expect(result instanceof jQuery).to.be.true;
      });

      it('should return an object that has the expected selector', () => {
        expect(result[0].id).to.equal('aTestWidget2');
      });

      it('should return an object that has the expected selector', () => {
        expect(result.hasClass('hackertext')).to.be.true;
      });
    });
  });
});
