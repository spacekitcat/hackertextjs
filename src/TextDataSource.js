define('TextDataSource', [
  'WhiteSpaceSourceFilter',
  'ToUpperCaseSourceFilter',
  'SpecialCharacterSourceFilter',
], (WhiteSpaceSourceFilter, ToUpperCaseSourceFilter, SpecialCharacterSourceFilter) =>
  class TextDataSource {
    constructor() {
      this.core_filters = [];
      this.core_filters.push(WhiteSpaceSourceFilter);
      this.core_filters.push(ToUpperCaseSourceFilter);
      this.core_filters.push(SpecialCharacterSourceFilter);

      this.extra_filters = [];
    }

    getNext() {
      if (this.iteratorSource === undefined || this.iteratorSource === null) {
        return '_';
      }

      let nextChar = this.iteratorSource.getNext();
      // Bit on the Jack Hack side
      if (nextChar === '') {
        nextChar = '_';
      }
      this.core_filters.forEach((element) => {
        nextChar = element(nextChar);
      });

      this.extra_filters.forEach((element) => {
        nextChar = element(nextChar);
      });

      return nextChar;
    }

    setIteratorSource(iteratorSource) {
      this.iteratorSource = iteratorSource;
    }

    addFilter(filter) {
      this.extra_filters.push(filter);
    }

    getFilters() {
      return this.extra_filters;
    }
  });
