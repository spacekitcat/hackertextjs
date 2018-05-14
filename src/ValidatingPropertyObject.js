define('ValidatingPropertyObject', [], () =>
  class ValidatingPropertyObject {
    constructor(acceptedKeysWithDefaultValues) {
      this.properties = {};
      if (acceptedKeysWithDefaultValues !== undefined) {
        this.properties = acceptedKeysWithDefaultValues;
      }
    }

    getValue(key) {
      if (key === undefined || key === null || key === '') {
        throw Error(`invalid key ${key}`);
      }

      return this.properties[key];
    }

    setValue(key, value) {
      if (this.properties[key] === undefined) {
        throw new Error(`'${key}' is not a valid property key`);
      }

      this.properties[key] = value;
    }

    hasKey(key) {
      return this.properties[key] !== undefined;
    }

    validateCustomOptions(customOptions) {
      return Object.keys(customOptions).every(key => this.hasKey(key));
    }
  });
