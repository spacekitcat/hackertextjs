define(['require', 'chai', 'SpecialCharacterSourceFilter'], function(
  require,
  chai,
  SpecialCharacterSourceFilter
) {
  describe('constructor()', () => {
    describe('No arguments provided', () => {
      it('should throw a TypeError', () => {
        expect(() => {
          SpecialCharacterSourceFilter();
        }).to.throw(TypeError, /No arguments/);
      });
    });

    describe('Null arguments provided', () => {
      it('should throw a TypeError', () => {
        expect(() => {
          SpecialCharacterSourceFilter(null);
        }).to.throw(
          TypeError,
          /Invalid argument provided - the character cannot be null./
        );
      });
    });

    describe('Regular characters (no special characters)', () => {
      it("shouldn't throw any exception", () => {
        expect(() => {
          SpecialCharacterSourceFilter('Q');
        }).not.to.throw();
      });

      it('return the source character as-is', () => {
        expect(SpecialCharacterSourceFilter('Q')).to.equal('Q');
      });
    });

    describe('Special characters', () => {
      it('should convert the special character, -, to _', () => {
        expect(SpecialCharacterSourceFilter('-')).to.equal('_');
      });

      it('should convert the special character, ., to _', () => {
        expect(SpecialCharacterSourceFilter('.')).to.equal('_');
      });

      it('should convert the special character, |, to _', () => {
        expect(SpecialCharacterSourceFilter('|')).to.equal('_');
      });
    });
  });
});
