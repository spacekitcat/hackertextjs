define(['require', 'chai', 'TextCharacterWidthCalculator'], function(
  require,
  chai,
  TextCharacterWidthCalculator
) {
  var should = chai.should();
  var expect = chai.expect;

  describe('constructor()', () => {
    it("shouldn't throw any exception", () => {
      expect(() => {
        new TextCharacterWidthCalculator();
      }).to.not.throw();
    });
  });

  describe('computeFontSize()', () => {
    describe('undefined CSS object', () => {
      var sut = new TextCharacterWidthCalculator();
      it('should throw TypeError', () => {
        expect(() => {
          sut.computeFontSize();
        }).to.throw(TypeError, /CSS/);
      });
    });

    describe('null CSS object', () => {
      var sut = new TextCharacterWidthCalculator();
      it('should throw TypeError', () => {
        expect(() => {
          sut.computeFontSize(null);
        }).to.throw(TypeError, /CSS/);
      });
    });

    describe('valid, but empty CSS object', () => {
      var sut = new TextCharacterWidthCalculator();
      it("shouldn't throw any exceptions", () => {
        expect(() => {
          sut.computeFontSize({});
        }).to.not.throw;
      });

      it("shouldn't be null", () => {
        expect(sut.computeFontSize({})).to.not.be.null;
      });

      it('should be more than zero', () => {
        expect(sut.computeFontSize({})).to.not.equal(0);
      });
    });

    describe('1px, Monospace font', () => {
      var sut = new TextCharacterWidthCalculator();

      it('should have correct width', () => {
        expect(
          sut.computeFontSize({
            'font-family': 'Monospace',
            'font-size': '1px',
            'word-wrap': 'break-word'
          })
        ).to.be.within(0.59, 0.61);
      });
    });

    describe('2px, Monospace font', () => {
      var sut = new TextCharacterWidthCalculator();

      it('should have correct width', () => {
        expect(
          sut.computeFontSize({
            'font-family': 'Monospace',
            'font-size': '2px',
            'word-wrap': 'break-word'
          })
        ).to.be.within(1.19, 1.21);
      });
    });

    describe('3px, Monospace font', () => {
      var sut = new TextCharacterWidthCalculator();

      it('should have correct width', () => {
        expect(
          sut.computeFontSize({
            'font-family': 'Monospace',
            'font-size': '3px',
            'word-wrap': 'break-word'
          })
        ).to.be.within(1.8, 1.82);
      });
    });

    describe('4px, Monospace font', () => {
      var sut = new TextCharacterWidthCalculator();

      it('should have correct width', () => {
        expect(
          sut.computeFontSize({
            'font-family': 'Monospace',
            'font-size': '4px',
            'word-wrap': 'break-word'
          })
        ).to.be.within(2.4, 2.42);
      });
    });

    describe('5px, Monospace font', () => {
      var sut = new TextCharacterWidthCalculator();

      it('should have correct width', () => {
        expect(
          sut.computeFontSize({
            'font-family': 'Monospace',
            'font-size': '5px',
            'word-wrap': 'break-word'
          })
        ).to.be.within(3.0, 3.02);
      });
    });

    describe('6px, Monospace font', () => {
      var sut = new TextCharacterWidthCalculator();

      it('should have correct width', () => {
        expect(
          sut.computeFontSize({
            'font-family': 'Monospace',
            'font-size': '6px',
            'word-wrap': 'break-word'
          })
        ).to.be.within(3.6, 5.62);
      });
    });

    describe('7px, Monospace font', () => {
      var sut = new TextCharacterWidthCalculator();

      it('should have correct width', () => {
        expect(
          sut.computeFontSize({
            'font-family': 'Monospace',
            'font-size': '7px',
            'word-wrap': 'break-word'
          })
        ).to.be.within(4.2, 4.22);
      });
    });

    describe('8px, Monospace font', () => {
      var sut = new TextCharacterWidthCalculator();

      it('should have correct width', () => {
        expect(
          sut.computeFontSize({
            'font-family': 'Monospace',
            'font-size': '8px',
            'word-wrap': 'break-word'
          })
        ).to.be.within(4.79, 4.81);
      });
    });

    describe('9px, Monospace font', () => {
      var sut = new TextCharacterWidthCalculator();

      it('should have correct width', () => {
        expect(
          sut.computeFontSize({
            'font-family': 'Monospace',
            'font-size': '9px',
            'word-wrap': 'break-word'
          })
        ).to.be.within(5.39, 5.41);
      });
    });

    describe('10px, Monospace font', () => {
      var sut = new TextCharacterWidthCalculator();

      it('should have correct width', () => {
        expect(
          sut.computeFontSize({
            'font-family': 'Monospace',
            'font-size': '10px',
            'word-wrap': 'break-word'
          })
        ).to.be.within(5.99, 6.01);
      });
    });

    describe('11px, Monospace font', () => {
      var sut = new TextCharacterWidthCalculator();

      it('should have correct width', () => {
        expect(
          sut.computeFontSize({
            'font-family': 'Monospace',
            'font-size': '11px',
            'word-wrap': 'break-word'
          })
        ).to.be.within(6.59, 6.61);
      });
    });

    describe('12px, Monospace font', () => {
      var sut = new TextCharacterWidthCalculator();

      it('should have correct width', () => {
        expect(
          sut.computeFontSize({
            'font-family': 'Monospace',
            'font-size': '12px',
            'word-wrap': 'break-word'
          })
        ).to.be.within(7.19, 7.21);
      });
    });

    describe('13px, Monospace font', () => {
      var sut = new TextCharacterWidthCalculator();

      it('should have correct width', () => {
        expect(
          sut.computeFontSize({
            'font-family': 'Monospace',
            'font-size': '13px',
            'word-wrap': 'break-word'
          })
        ).to.be.within(7.79, 7.81);
      });
    });

    describe('14px, Monospace font', () => {
      var sut = new TextCharacterWidthCalculator();

      it('should have correct width', () => {
        expect(
          sut.computeFontSize({
            'font-family': 'Monospace',
            'font-size': '14px',
            'word-wrap': 'break-word'
          })
        ).to.be.within(8.39, 8.41);
      });
    });

    describe('15px, Monospace font', () => {
      var sut = new TextCharacterWidthCalculator();

      it('should have correct width', () => {
        expect(
          sut.computeFontSize({
            'font-family': 'Monospace',
            'font-size': '15px',
            'word-wrap': 'break-word'
          })
        ).to.be.within(8.99, 9.01);
      });
    });

    describe('16px, Monospace font', () => {
      var sut = new TextCharacterWidthCalculator();

      it('should have correct width', () => {
        expect(
          sut.computeFontSize({
            'font-family': 'Monospace',
            'font-size': '16px',
            'word-wrap': 'break-word'
          })
        ).to.be.within(9.59, 9.61);
      });
    });

    describe('72px, Monospace font', () => {
      var sut = new TextCharacterWidthCalculator();

      it('should have correct width', () => {
        expect(
          sut.computeFontSize({
            'font-family': 'Monospace',
            'font-size': '72px',
            'word-wrap': 'break-word'
          })
        ).to.be.within(43.2, 43.22);
      });
    });
  });
});
