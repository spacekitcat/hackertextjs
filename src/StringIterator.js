define('StringIterator', [], () =>
  class StringIterator {
    constructor(textString) {
      if (textString == null) {
        this.textString = '';
      } else {
        this.textString = textString;
      }

      this.textStringIndex = 0;
    }

    getNext() {
      if (this.textString.length === 0) {
        return '';
      } else if (this.textStringIndex >= this.textString.length) {
        this.textStringIndex = 0;
      }

      const nextCharacter = this.textString[this.textStringIndex];
      this.textStringIndex += 1;

      return nextCharacter;
    }

    reset() {
      this.textStringIndex = 0;
    }

    getText() {
      return this.textString;
    }

    setText(textString) {
      this.textString = textString;
    }
  });
