define('ValidatingPropertyObject', [], () =>
  class ValidatingPropertyObject {
    constructor() {
      this.properties = new Map();
    }
    getValue(key) {
      if (key === undefined || key === null || key === '') {
        throw Error(`invalid key ${key}`);
      }

      return this.properties.get(key);
    }
    setValue(key, value) {
      this.properties.set(key, value);
    }
  });
