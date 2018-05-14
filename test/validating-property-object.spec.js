define(['require', 'chai', 'StringIterator', 'ValidatingPropertyObject'], (
  require,
  chai,
  StringIterator,
  ValidatingPropertyObject
) => {
  const { expect } = chai;
  describe('validateCustomOptions', () => {
    const sut = new ValidatingPropertyObject({
      'acceptable-key-one': 'key-one-value',
      'acceptable-key-two': 'key-two-value'
    });

    it('should accept valid keys', () => {
      expect(
        sut.validateCustomOptions({
          'acceptable-key-one': 'newk1v',
          'acceptable-key-two': 'newk2v'
        })
      ).to.equal(true);
    });
  });

  describe('hasKey', () => {
    const sut = new ValidatingPropertyObject({
      'acceptable-key-one': 'key-one-value',
      'acceptable-key-two': 'key-two-value'
    });

    describe('and it does contain the key', () => {
      it('should return true', () => {
        expect(sut.hasKey('acceptable-key-one')).to.equal(true);
      });
    });
  });

  describe('setValue', () => {
    const sut = new ValidatingPropertyObject({
      'acceptable-key-one': 'key-one-value',
      'acceptable-key-two': 'key-two-value'
    });

    describe('and the key is an acceptable value', () => {
      expect(() =>
        sut.setValue('unacceptable-key', 'new-key-one-value')
      ).to.throw(/'unacceptable-key' is not a valid property key/);
    });

    describe('and the key is an acceptable value', () => {
      beforeEach(() => {
        sut.setValue('acceptable-key-one', 'new-key-one-value');
      });
      it('should update the value', () => {
        expect(sut.getValue('acceptable-key-one', 'new-key-one-value'));
      });
    });
  });

  describe('getValue', () => {
    describe('where the property object is empty', () => {
      describe('and the key does not exist', () => {
        const sut = new ValidatingPropertyObject();

        it('should return "undefined"', () => {
          expect(sut.getValue('this-key-does-not-exist')).to.equal(undefined);
        });
      });

      describe('and the key is an empty string', () => {
        const sut = new ValidatingPropertyObject();

        it('should throw an exception', () => {
          expect(() => {
            sut.getValue('');
          }).to.throw(/invalid key/);
        });
      });
    });

    describe('where the key has one item with a default value', () => {
      const sut = new ValidatingPropertyObject({
        'valid-key': 'default-value'
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
          expect(sut.getValue('valid-key')).to.equal('default-value');
        });
      });
    });
  });
});
