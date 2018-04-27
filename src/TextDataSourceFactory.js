define('TextDataSourceFactory', ['TextDataSource', 'StringIterator', 'LeetSourceFilter'], (
  TextDataSource,
  StringIterator,
  LeetSourceFilter,
) =>
  class TextDataSourceFactory {
    static makeCoreTextDataSource(sourceText = null) {
      const textDataSource = new TextDataSource();

      textDataSource.setIteratorSource(new StringIterator(sourceText));

      return textDataSource;
    }

    static makeLeetTextDataSource(sourceText = null) {
      const textDataSource = new TextDataSource();

      textDataSource.setIteratorSource(new StringIterator(sourceText));
      textDataSource.addFilter(LeetSourceFilter);

      return textDataSource;
    }
  });
