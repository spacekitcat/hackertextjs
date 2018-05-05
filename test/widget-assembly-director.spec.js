define([
  'require',
  'chai',
  'WidgetAssemblyDirector',
  'Widget',
  'LeetSourceFilter'
], function(require, chai, WidgetAssemblyDirector, Widget, LeetSourceFilter) {
  describe('constructor()', () => {
    describe('No arguments provided', () => {
      expect(() => {
        new WidgetAssemblyDirector();
      }).to.not.throw();
    });
  });

  describe('assemble(..)', () => {
    describe('where no widgetSpecification is provided', () => {
      beforeEach(() => {
        new WidgetAssemblyDirector();
      });

      it('should throw an exception', () => {
        expect(() => {
          WidgetAssemblyDirector.assemble();
        }).to.throw('A widget descriptor must be provided.');
      });
    });

    describe('where a null widgetSpecification is provided', () => {
      var widgetAssemblyDirector;
      beforeEach(() => {
        widgetAssemblyDirector = new WidgetAssemblyDirector();
      });

      it('should throw an exeption', () => {
        expect(() => {
          WidgetAssemblyDirector.assemble(null);
        }).to.throw('A widget descriptor must be provided.');
      });
    });

    describe('where a blank widgetSpecification is provided', () => {
      var widgetAssemblyDirector;
      beforeEach(() => {
        widgetAssemblyDirector = new WidgetAssemblyDirector();
      });

      it('should throw an exeption', () => {
        expect(() => {
          WidgetAssemblyDirector.assemble({});
        }).to.throw('An "htmlId" must be defined in each widgetSpecification.');
      });
    });

    describe('where a widgetSpecification with an htmlId is provided', () => {
      var widgetAssemblyDirector;

      beforeEach(() => {
        $('body').append('<div id="aTestWidget"></div>');
        widgetAssemblyDirector = new WidgetAssemblyDirector();
      });

      it('should return a Widget instance', () => {
        var result = WidgetAssemblyDirector.assemble({ htmlId: 'aTestWidget' });
        expect(result instanceof Widget).is.true;
      });

      it('should default the row count to 42', () => {
        var result = WidgetAssemblyDirector.assemble({ htmlId: 'aTestWidget' });
        expect(result.getRowCount()).to.equal(42);
      });

      it('should default the dynamicnoiseratio to true', () => {
        var result = WidgetAssemblyDirector.assemble({ htmlId: 'aTestWidget' });
        expect(result.getRenderer().getOptionValue('dynamicnoiseratio')).to.be
          .true;
      });

      describe('and where a custom (valid) row count is defined', () => {
        it('should use the specified row count value', () => {
          var result = WidgetAssemblyDirector.assemble({
            htmlId: 'aTestWidget',
            rows: 20
          });
          expect(result.getRowCount()).to.equal(20);
        });
      });

      describe('and where a optional (valid - LeetSourceFilter) filter is specified', () => {
        it('should apply the filter to the Text Data Source object', () => {
          var result = WidgetAssemblyDirector.assemble({
            htmlId: 'aTestWidget',
            text_character_filters: ['LeetSourceFilter']
          });
          expect(
            result
              .getRenderer()
              .getTextDataSource()
              .getFilters()
          ).to.contain(LeetSourceFilter);
        });
      });
      // This doesn't make sense right now. I was misusing requirejs because I had wrong headed ideas about it. It was sheer luck that dynamic loading ever worked to start with.
      /*describe('and where a optional (invalid) filter is specified', () => {
        it('should apply the filter to the Text Data Source object', () => {
          expect(() => {
            WidgetAssemblyDirector.assemble({
              htmlId: 'aTestWidget',
              text_character_filters: ['NonExistantFilter']
            });
          }).to.throw(/could not be loaded/);
        });
      });*/
    });
  });
});
