define(['require', 'chai', 'StringIterator', 'ValidatingPropertyObject'], (
  require,
  chai,
  StringIterator,
  ValidatingPropertyObject
) => {
  const { expect } = chai;

  describe('getValue', () => {
    describe('where the key set it empty', () => {
      describe('and the key does not exist', () => {
        const sut = new ValidatingPropertyObject();

        it('should throw an exception', () => {
          expect(() => {
            sut.getValue('this-key-does-not-exist');
          }).to.throw(/invalid key/);
        });
      });
    });
  });
});
