define(['require', 'chai', 'StringIterator', 'FrameRenderer'], function(
  require,
  chai,
  StringIterator,
  FrameRenderer
) {
  var should = chai.should();
  var expect = chai.expect;

  var random_stub = sinon.stub(Math, 'random').returns(0.4);

  describe('computerNextFrame', () => {
    it('should generate only from the data source where Math.random is locked to 0.4 and the noise ratio is 0.3', () => {
      var sut = new FrameRenderer();

      sut.setFrameSize(17);
      sut.setOptionValue('noiseratio', 0.3);
      sut.setTextDataSource(new StringIterator('PINK_FLOYD_'));

      expect(sut.computeNextFrame()).to.equal('PINK_FLOYD_PINK_F');
    });

    it('should generate only spaces where Math.random is locked to 0.4 and the noise ratio is 0.4', () => {
      var sut = new FrameRenderer();
      sut.setFrameSize(13);
      sut.setOptionValue('noiseratio', 0.4);
      sut.setTextDataSource(new StringIterator('PINK_FLOYD_'));

      expect(sut.computeNextFrame()).to.equal('_____________');
    });

    describe("where the data source doesn't provide getNext", () => {
      it('should throw a clear exception', () => {
        var sut = new FrameRenderer();
        sut.setFrameSize(12);
        sut.setOptionValue('noiseratio', 0.5);

        // Bof! No data source!?

        expect(() => {
          sut.computeNextFrame();
        }).to.throw(
          'Data source object must provide an implementation of getNext.'
        );
      });
    });
  });

  describe('getFrameSize()', () => {
    it('should default to 500', () => {
      var sut = new FrameRenderer();
      expect(sut.getFrameSize()).to.equal(500);
    });

    it('should return updated framesize after its set', () => {
      var sut = new FrameRenderer();
      sut.setFrameSize(340);
      expect(sut.getFrameSize()).to.equal(340);
    });
  });

  describe('getOptions()', function() {
    describe('Constructed with null options parameter', function() {
      it('should fallback to the defaults and without any exceptions', function() {
        expect(function() {
          new FrameRenderer(null);
        }).to.not.throw();
      });
    });

    describe('Constructed with empty options parameter', function() {
      it('should fallback to the defaults and without any exceptions', function() {
        expect(function() {
          new FrameRenderer({});
        }).to.not.throw();
      });

      it('noiseratio should default to 0.5', function() {
        var sut = new FrameRenderer({});
        var options = sut.getOptions();
        expect(options.noiseratio).to.equal(0.5);
      });
    });

    describe('Constructed with custom options in the options parameter', function() {
      it('should accept the custom options without any exceptions', function() {
        expect(function() {
          new FrameRenderer({ noiseratio: 0.3 });
        }).to.not.throw();
      });

      it('noiseratio should update via setter', function() {
        var sut = new FrameRenderer({ noiseratio: 0.3 });
        expect(sut.getOptionValue('noiseratio')).to.equal(0.3);
      });
    });
  });

  describe('Constructed with entirely unrecognised custom options in the options paramter', function() {
    it('should throw an exception for invalid keys', function() {
      expect(function() {
        new FrameRenderer({ aninvalidkey: 1135 });
      }).to.throw(Error, /invalid options/);
    });
  });

  describe('setOptionValue()', function() {
    describe('Option key undefinend', function() {
      var sut = new FrameRenderer();
      it('throws a type exception', function() {
        expect(function() {
          sut.setOptionValue();
        }).to.throw(Error, /key/);
      });
    });

    describe('Option key undefinend', function() {
      var sut = new FrameRenderer();
      it('throws a type exception', function() {
        expect(function() {
          sut.setOptionValue(null);
        }).to.throw(Error, /key/);
      });
    });

    describe('Option value undefinend', function() {
      var sut = new FrameRenderer();
      it('throws a type exception', function() {
        expect(function() {
          sut.setOptionValue('noiseratio');
        }).to.throw(Error, /value/);
      });
    });

    describe('Option value undefinend', function() {
      var sut = new FrameRenderer();
      it('throws a type exception', function() {
        expect(function() {
          sut.setOptionValue('noiseratio', null);
        }).to.throw(Error, /value/);
      });
    });

    describe("Option key isn't a valid option", function() {
      var sut = new FrameRenderer();
      it('throws a type exception', function() {
        expect(function() {
          sut.setOptionValue('invalid-key', 'value');
        }).to.throw(Error, /key/);
      });
    });

    describe('Valid update params (noiseratio)', function() {
      var sut = new FrameRenderer();
      sut.setOptionValue('noiseratio', 0.8);

      it('updates the key value (noiseratio)', function() {
        expect(sut.getOptionValue('noiseratio')).to.equal(0.8);
      });
    });
  });

  describe('getOptionValue()', function() {
    describe('Option key undefinend', function() {
      var sut = new FrameRenderer();
      it('throws a type exception', function() {
        expect(function() {
          sut.getOptionValue();
        }).to.throw(Error, /key/);
      });
    });

    describe('Null option key', function() {
      var sut = new FrameRenderer();
      it('throws a type exception', function() {
        expect(function() {
          sut.getOptionValue(null);
        }).to.throw(Error, /key/);
      });
    });

    describe('Undefined key', function() {
      var sut = new FrameRenderer();
      var result = sut.getOptionValue('undefined-key');

      it('returns null', function() {
        expect(result).to.equal(undefined);
      });
    });

    describe('Valid key-value set', function() {
      var sut = new FrameRenderer({
        noiseratio: 0.5
      });

      it('returns value for key', function() {
        var result = sut.getOptionValue('noiseratio');
        expect(result).to.equal(0.5);
      });
    });
  });
});
