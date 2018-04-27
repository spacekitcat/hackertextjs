define(['require', 'chai', 'ToUpperCaseSourceFilter'], function(
  require,
  chai,
  ToUpperCaseSourceFilter
) {
  describe('constructor()', () => {
    describe('No arguments provided', () => {
      it('should throw a TypeError', () => {
        expect(() => {
          ToUpperCaseSourceFilter();
        }).to.throw(TypeError, /No arguments/);
      });
    });

    describe('Null arguments provided', () => {
      it('should throw a TypeError', () => {
        expect(() => {
          ToUpperCaseSourceFilter(null);
        }).to.throw(
          TypeError,
          /Invalid argument provided - the character cannot be null./
        );
      });
    });

    describe('Upper-case source character', () => {
      it("shouldn't throw any exception", () => {
        expect(() => {
          ToUpperCaseSourceFilter('Q');
        }).not.to.throw();
      });

      it('return the source character as-is', () => {
        expect(ToUpperCaseSourceFilter('Q')).to.equal('Q');
      });
    });

    describe('Lower-case source character', () => {
      it('converts the source character to upper case', () => {
        expect(ToUpperCaseSourceFilter('q')).to.equal('Q');
      });
    });
  });
});
