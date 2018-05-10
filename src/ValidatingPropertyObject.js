define('ValidatingPropertyObject', [], () =>
  class ValidatingPropertyObject {
    getValue(key) {
      throw Error(`invalid key ${key}`);
    }
    setValue(key, value) {}
  });
