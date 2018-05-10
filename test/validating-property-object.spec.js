define(['require', 'chai', 'StringIterator', 'ValidatingPropertyObject'], (
  require,
  chai,
  StringIterator,
  ValidatingPropertyObject
) => {
  const { expect } = chai;

  describe('getValue', () => {
    describe('where the key set is empty', () => {
      describe('and the key does not exist', () => {
        const sut = new ValidatingPropertyObject();

        it('should throw an exception', () => {
          expect(() => {
            sut.getValue('this-key-does-not-exist');
          }).to.throw(/invalid key/);
        });
      });
      describe('and the key is empty', () => {
        const sut = new ValidatingPropertyObject();

        it('should throw an exception', () => {
          expect(() => {
            sut.getValue('');
          }).to.throw(/invalid key/);
        });
      });
    });
    describe('where the key has one item', () => {
      const sut = new ValidatingPropertyObject();
      beforeEach(() => {
        sut.setValue('valid-key', 'valid-value');
      });

      describe('and the key does not exist', () => {
        it('should throw an exception', () => {
          expect(() => {
            sut.getValue('this-key-does-not-exist');
          });
        });
      });

      describe('and the key does exist', () => {
        it('should throw an exception', () => {
          expect(sut.getValue('valid-key')).to.equal('valid-value');
        });
      });
    });
  });
});
