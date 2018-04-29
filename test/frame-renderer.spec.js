define(['require', 'chai', 'StringIterator', 'FrameRenderer', 'RandomizedFrameRenderStrategy'], function(
      require,
      chai,
      StringIterator,
      FrameRenderer,
      RandomizedFrameRenderStrategy
      ) {
  var should = chai.should();
  var expect = chai.expect;

  var random_stub;

  describe('computeNextFrame', () => {
    before(() => {
      random_stub = sinon.stub(Math, 'random').returns(0.4);
    });

    after(() => {
      random_stub.restore();
    });

    describe('has no frame render strategy', () => {
      it('should generate a blank frame', () => {
        let sut = new FrameRenderer();
        sut.setFrameSize(8);
        let renderStrategy = new RandomizedFrameRenderStrategy();
        renderStrategy.setTextDataSource(new StringIterator("PINK_FLOYD_"));
        renderStrategy.setOptionValue('noiseratio', 0.4);
        sut.setFrameRenderStrategy(renderStrategy);

        expect(sut.computeNextFrame()).to.equal('________');
      });
    });

    it('should generate only from the data source where Math.random is locked to 0.4 and the noise ratio is 0.3', () => {
      var sut = new FrameRenderer();

      sut.setFrameSize(17);
      let renderStrategy = new RandomizedFrameRenderStrategy();
      renderStrategy.setTextDataSource(new StringIterator("PINK_FLOYD_"));
      renderStrategy.setOptionValue('noiseratio', 0.3);
      sut.setFrameRenderStrategy(renderStrategy);

      expect(sut.computeNextFrame()).to.equal('PINK_FLOYD_PINK_F');
    });

    it('should generate only spaces where Math.random is locked to 0.4 and the noise ratio is 0.4', () => {
      var sut = new FrameRenderer();
      sut.setFrameSize(13);
      let renderStrategy = new RandomizedFrameRenderStrategy();
      renderStrategy.setTextDataSource(new StringIterator("PINK_FLOYD_"));
      renderStrategy.setOptionValue('noiseratio', 0.4);
      sut.setFrameRenderStrategy(renderStrategy);

      expect(sut.computeNextFrame()).to.equal('_____________');
    });

  });

  describe('getFrameSize()', () => {
    it('should default to 500', () => {
      let sut = new FrameRenderer();
      expect(sut.getFrameSize()).to.equal(500);
    });

    it('should return updated framesize after its set', () => {
      let sut = new FrameRenderer();
      sut.setFrameSize(340);
      expect(sut.getFrameSize()).to.equal(340);
    });

  });

  describe('getOptions()', () => {
    describe('Constructed with null options parameter', () => {
      it('should fallback to the defaults and without any exceptions', () => {
        expect(function() {
          new FrameRenderer(null);
        }).to.not.throw();
      });
    });

    describe('Constructed with empty options parameter', () => {
      it('should fallback to the defaults and without any exceptions', () => {
        expect(function() {
          new FrameRenderer({});
        }).to.not.throw();
      });

      it('noiseratio should default to 0.5', () => {
        let sut = new FrameRenderer({});
        let options = sut.getOptions();
        expect(options.noiseratio).to.equal(0.5);
      });
    });

    describe('Constructed with custom options in the options parameter', () => {
      it('should accept the custom options without any exceptions', () => {
        expect(function() {
          new FrameRenderer({ noiseratio: 0.3 });
        }).to.not.throw();
      });

      it('noiseratio should update via setter', () => {
        var sut = new FrameRenderer({ noiseratio: 0.3 });
        expect(sut.getOptionValue('noiseratio')).to.equal(0.3);
      });
    });
  });

  describe('Constructed with entirely unrecognised custom options in the options paramter', () => {
    it('should throw an exception for invalid keys', () => {
      expect(function() {
        new FrameRenderer({ aninvalidkey: 1135 });
      }).to.throw(Error, /invalid options/);
    });
  });

  describe('setOptionValue()', () => {
    describe('Option key undefinend', () => {
      let sut = new FrameRenderer();
      it('throws a type exception', () => {
        expect(function() {
          sut.setOptionValue();
        }).to.throw(Error, /key/);
      });
    });

    describe('Option key undefinend', () => {
      var sut = new FrameRenderer();
      it('throws a type exception', () => {
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

    describe('Valid key-value set', () => {
      var sut = new FrameRenderer({
        noiseratio: 0.5
      });

      it('returns value for key', () => {
        var result = sut.getOptionValue('noiseratio');
        expect(result).to.equal(0.5);
      });
    });

    describe('setFrameRenderStrategy', () => {
      describe('where the argument isn\'t provided', () => {

        it('should throw an exception', () => {
          let sut = new FrameRenderer();

          expect(() => sut.setFrameRenderStrategy())
            .to.throw(/setFrameRenderStrategy requires the argument frameRenderStrategyImpl/);
        });

      });

      describe('where the argument is null', () => {

        it('should throw an exception', () => {
          let sut = new FrameRenderer();

          expect(() => sut.setFrameRenderStrategy(null))
            .to.throw(/setFrameRenderStrategy requires the argument frameRenderStrategyImpl/);
        });

      });

      describe('where the argument doesn\'t provide an implementation of render(..)', () => {

        it('should throw an exception', () => {
          let sut = new FrameRenderer();

          expect(() => sut.setFrameRenderStrategy({}))
            .to.throw(/frameRenderStrategyImpl must provide an implementation of render(..)/);
        });

      });

      describe('where the argument is valid', () => {

        it('should not throw any exceptions whatsoever', () => {
          let sut = new FrameRenderer();

          expect(() => sut.setFrameRenderStrategy(new RandomizedFrameRenderStrategy()))
            .to.not.throw();
        });

      });
    });
  });
});
