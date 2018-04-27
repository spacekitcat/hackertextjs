define(['require', 'chai', 'StringIterator'], function(
  require,
  chai,
  StringIterator
) {
  describe('constructor()', () => {
    describe('regular textString parameter', () => {
      var sut = new StringIterator("Peace sells, but who's buying");

      it('should intialise textString to "Peace sells, but who\'s buying"', () => {
        return chai.assert.equal(
          "Peace sells, but who's buying",
          sut.textString
        );
      });

      it('should intialise textStringIndex', () => {
        return chai.assert.equal(0, sut.textStringIndex);
      });
    });

    describe('empty string textString parameter', () => {
      var sut = new StringIterator('');

      it('should intialise textString to ""', () => {
        return chai.assert.equal('', sut.textString);
      });

      it('should intialise textStringIndex to zero', () => {
        return chai.assert.equal(0, sut.textStringIndex);
      });
    });

    describe('null textString parameter', () => {
      var sut = new StringIterator(null);

      it('should intialise textString to ""', () => {
        return chai.assert.equal('', sut.textString);
      });

      it('should intialise textStringIndex to zero', () => {
        return chai.assert.equal(0, sut.textStringIndex);
      });
    });
  });

  describe('getNext()', () => {
    describe('null constructor paramater on first call', () => {
      var sut = new StringIterator(null);

      it('should return a blank string', () => {
        return chai.assert.equal('', sut.getNext());
      });
    });

    describe('blank constructor paramater on first call', () => {
      var sut = new StringIterator('');

      it('should return a blank string', () => {
        return chai.assert.equal('', sut.getNext());
      });
    });

    describe('first call with standard constructor paramater', () => {
      var sut = new StringIterator("Peace sells, but who's buying");

      it('should return the first letter', () => {
        return chai.assert.equal('P', sut.getNext());
      });
    });

    describe('second call with null constructor paramater', () => {
      var sut = new StringIterator(null);
      sut.getNext();

      it('should return a blank string', () => {
        return chai.assert.equal('', sut.getNext());
      });
    });

    describe('second call with blank constructor paramater', () => {
      var sut = new StringIterator('');
      sut.getNext();

      it('should return a blank string', () => {
        return chai.assert.equal('', sut.getNext());
      });
    });

    describe('second call with regular constructor paramater', () => {
      var sut = new StringIterator("Peace sells, but who's buying");
      sut.getNext();

      it('should return the second letter', () => {
        return chai.assert.equal('e', sut.getNext());
      });
    });

    describe('enough calls to loop back to the start of the sentence', () => {
      var sut = new StringIterator('abc');
      sut.getNext();
      sut.getNext();
      sut.getNext();

      it('should return the first character (i.e. it loops back round)', () => {
        return chai.assert.equal('a', sut.getNext());
      });
    });
  });

  describe('reset()', () => {
    var sut = new StringIterator('abc');

    describe('Reset immedietly after sut construction', () => {
      it('should return the first letter (a)', () => {
        chai.assert.strictEqual('a', sut.getNext());
      });
    });

    describe('Reset immedietly after one call to getNext() construction', () => {
      it('should return the first letter (a)', () => {
        sut.getNext();
        sut.reset();
        chai.assert.strictEqual('a', sut.getNext());
      });
    });
  });

  describe('getText()', () => {
    var sut = new StringIterator('abc');

    it('should return the full text string', () => {
      expect(sut.getText()).to.equal('abc');
    });
  });

  describe('setText()', () => {
    var sut = new StringIterator();

    sut.setText('cba');

    it('should return the full text string', () => {
      expect(sut.getText()).to.equal('cba');
    });
  });
});
