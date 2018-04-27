define(['require', 'chai', 'TextDataSource', 'StringIterator'], function(
  require,
  chai,
  TextDataSource,
  StringIterator
) {
  describe('constructor()', () => {
    describe('no arguments', () => {
      it("shouldn't throw any exceptions", () => {
        expect(() => {
          new TextDataSource();
        }).not.to.throw();
      });
    });
  });

  describe('getNext()', () => {
    describe('TextDataSource instance not configured', () => {
      it('should return a space character', () => {
        var sut = new TextDataSource();
        expect(sut.getNext()).to.equal('_');
      });
    });

    describe('TextDataSource optional filters', () => {
      describe('TextDataSource optional filters', () => {
        it('should execute single filter chain', () => {
          var sut = new TextDataSource();

          sut.setIteratorSource(new StringIterator('4444'));
          sut.addFilter(function(character) {
            return character.replace(/4/g, '5');
          });

          expect(sut.getNext()).to.equal('5');
        });
      });
    });

    describe('TextDataSource configured with StringIterator', () => {
      it('should return values from the iterator (correct first call)', () => {
        var sut = new TextDataSource();

        var iterator = new StringIterator('PIKA PIKA!');
        sut.setIteratorSource(iterator);
        expect(sut.getNext()).to.equal('P');
      });

      it('should return values from the iterator (correct first call, lower to upper conversion)', () => {
        var sut = new TextDataSource();

        var iterator = new StringIterator('pika pika!');
        sut.setIteratorSource(iterator);
        expect(sut.getNext()).to.equal('P');
      });

      it('should return the substituted space value instead of a space', () => {
        var sut = new TextDataSource();

        var iterator = new StringIterator(' P I K A ');
        sut.setIteratorSource(iterator);
        expect(sut.getNext()).to.equal('_');
      });

      it('should return the substituted space value instead of the special character', () => {
        var sut = new TextDataSource();

        var iterator = new StringIterator('-L-');
        sut.setIteratorSource(iterator);
        expect(sut.getNext()).to.equal('_');
      });

      it('should return values from the iterator (correct 3rd call)', () => {
        var sut = new TextDataSource();

        var iterator = new StringIterator('PIKA PIKA!');
        sut.setIteratorSource(iterator);
        sut.getNext();
        sut.getNext();
        expect(sut.getNext()).to.equal('K');
      });

      it('should return values from the iterator (should loop around past the end of the string)', () => {
        var sut = new TextDataSource();

        var iterator = new StringIterator('PI');
        sut.setIteratorSource(iterator);
        sut.getNext();
        sut.getNext();
        expect(sut.getNext()).to.equal('P');
      });
    });
  });
});
