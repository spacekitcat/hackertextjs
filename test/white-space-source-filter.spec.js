define(['require', 'chai', 'WhiteSpaceSourceFilter'], function(
  require,
  chai,
  WhiteSpaceSourceFilter
) {
  describe('constructor()', () => {
    describe('No arguments provided', () => {
      it('should throw a TypeError', () => {
        expect(() => {
          WhiteSpaceSourceFilter();
        }).to.throw(TypeError, /No arguments/);
      });
    });

    describe('Null arguments provided', () => {
      it('should throw a TypeError', () => {
        expect(() => {
          WhiteSpaceSourceFilter(null);
        }).to.throw(
          TypeError,
          /Invalid argument provided - the character cannot be null./
        );
      });
    });

    describe('Non-matching raw source character', () => {
      it("shouldn't throw any exception", () => {
        expect(() => {
          WhiteSpaceSourceFilter('aaab');
        }).not.to.throw();
      });

      it('return the unmodified character', () => {
        expect(WhiteSpaceSourceFilter('a')).to.equal('a');
      });
    });

    describe('Matching source character (space)', () => {
      it('substitutes the space with an underscore', () => {
        expect(WhiteSpaceSourceFilter(' ')).to.equal('_');
      });
    });

    describe('Matching source character (tab)', () => {
      it('substitutes the tab with eight underscores', () => {
        expect(WhiteSpaceSourceFilter('\t')).to.equal('________');
      });
    });
  });
});
