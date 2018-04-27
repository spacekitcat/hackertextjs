define(['require', 'chai', 'TextDataSourceFactory', 'TextDataSource'], function(
  require,
  chai,
  TextDataSourceFactory,
  TextDataSource
) {
  var should = chai.should();
  var expect = chai.expect;

  describe('constructor()', () => {
    it("shouldn't throw any exception", () => {
      expect(() => {
        new TextDataSourceFactory();
      }).to.not.throw();
    });
  });

  describe('makeCoreTextDataSource', () => {
    describe('where no arguments are provided', () => {
      var result = null;
      beforeEach(() => {
        result = TextDataSourceFactory.makeCoreTextDataSource();
      });

      it('should make a core text data source (core filters only)', () => {
        expect(result instanceof TextDataSource).to.be.true;
      });

      it('should return only underscores (no actual source data has been provided)', () => {
        expect(result.getNext()).to.equal('_');
      });
    });

    describe('where a literal string argument is provided', () => {
      beforeEach(() => {
        result = TextDataSourceFactory.makeCoreTextDataSource('hello');
      });

      it('should make a core text data source (core filters only)', () => {
        expect(result instanceof TextDataSource).to.be.true;
      });

      it('should return the next (filterd) character from the provided text', () => {
        expect(result.getNext()).to.equal('H');
      });
    });
  });

  describe('makeLeetTextDataSource', () => {
    describe('where no arguments are provided', () => {
      var result = null;
      beforeEach(() => {
        result = TextDataSourceFactory.makeLeetTextDataSource();
      });

      it('should make a core text data source (core filters only)', () => {
        expect(result instanceof TextDataSource).to.be.true;
      });

      it('should return only underscores (no actual source data has been provided)', () => {
        expect(result.getNext()).to.equal('_');
      });
    });

    describe('where a literal string argument is provided', () => {
      beforeEach(() => {
        result = TextDataSourceFactory.makeLeetTextDataSource('al');
      });

      it('should make a core text data source (core filters only)', () => {
        expect(result instanceof TextDataSource).to.be.true;
      });

      it('should return the next (filterd) character from the provided text', () => {
        expect(result.getNext()).to.equal('4');
      });
    });
  });
});
