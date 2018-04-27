define(['require', 'chai', 'LeetSourceFilter'], function(
  require,
  chai,
  LeetSourceFilter
) {
  describe('constructor()', () => {
    describe('No arguments provided', () => {
      it('should throw a TypeError', () => {
        expect(() => {
          LeetSourceFilter();
        }).to.throw(TypeError, /No arguments/);
      });
    });

    describe('Null arguments provided', () => {
      it('should throw a TypeError', () => {
        expect(() => {
          LeetSourceFilter(null);
        }).to.throw(
          TypeError,
          /Invalid argument provided - the character cannot be null./
        );
      });
    });

    describe('Non-matching raw source character', () => {
      it("shouldn't throw any exception", () => {
        expect(() => {
          LeetSourceFilter('q');
        }).not.to.throw();
      });

      it('return the unmodified source character', () => {
        expect(LeetSourceFilter('q')).to.equal('q');
      });
    });

    describe('Matching raw source characters', () => {
      it("shouldn't throw any exception", () => {
        expect(() => {
          LeetSourceFilter('l');
        }).not.to.throw();
      });

      it('return substituted source character (l => 1)', () => {
        expect(LeetSourceFilter('l')).to.equal('1');
      });

      it('return substituted source character (e => 3)', () => {
        expect(LeetSourceFilter('e')).to.equal('3');
      });

      it('return substituted source character (t => 7)', () => {
        expect(LeetSourceFilter('t')).to.equal('7');
      });

      it('return substituted source character (o => 0)', () => {
        expect(LeetSourceFilter('o')).to.equal('0');
      });

      it('return substituted source character (a => 4)', () => {
        expect(LeetSourceFilter('a')).to.equal('4');
      });

      it('return substituted source character (s => 5)', () => {
        expect(LeetSourceFilter('s')).to.equal('5');
      });
    });

    describe('Matching (upper-case) raw source characters', () => {
      it("shouldn't throw any exception", () => {
        expect(() => {
          LeetSourceFilter('L');
        }).not.to.throw();
      });

      it('return substituted source character (L => 1)', () => {
        expect(LeetSourceFilter('L')).to.equal('1');
      });

      it('return substituted source character (E => 3)', () => {
        expect(LeetSourceFilter('E')).to.equal('3');
      });

      it('return substituted source character (T => 7)', () => {
        expect(LeetSourceFilter('T')).to.equal('7');
      });

      it('return substituted source character (O => 0)', () => {
        expect(LeetSourceFilter('O')).to.equal('0');
      });

      it('return substituted source character (A => 4)', () => {
        expect(LeetSourceFilter('A')).to.equal('4');
      });

      it('return substituted source character (S => 5)', () => {
        expect(LeetSourceFilter('S')).to.equal('5');
      });
    });
  });
});
