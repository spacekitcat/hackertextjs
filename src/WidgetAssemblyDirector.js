define('WidgetAssemblyDirector', [
  'WidgetBuilder',
  'DomInitialiser',
  'TextDataSourceFactory',
  'RandomizedFrameRenderStrategy',
  'SinePhaseFrameRenderStrategy',
  'CoSinePhaseFrameRenderStrategy',
  'LeetSourceFilter',
], (
  WidgetBuilder,
  DomInitialiser,
  TextDataSourceFactory,
  RandomizedFrameRenderStrategy,
  SinePhaseFrameRenderStrategy,
  CoSinePhaseFrameRenderStrategy,
  LeetSourceFilter
) =>
  class WidgetAssemblyDirector {
    static instantiateSourceFilter(filterName) {
      try {
        return LeetSourceFilter;
      } catch (exception) {
        console.log(exception);
        throw new Error(`The filter '${filterName}' could not be loaded: ${exception}`);
      }
    }

    static instantiateRenderStrategy(renderStrategy) {
      try {
        return require(renderStrategy);
      } catch (exception) {
        console.log(exception);
        throw new Error(
          `The render strategy '${renderStrategy}' could not be loaded.`
        );
      }
    }

    static addSourceFilters(textDataSource, filters) {
      if (filters) {
        filters.forEach(filterName =>
          textDataSource.addFilter(
            WidgetAssemblyDirector.instantiateSourceFilter(filterName)
          )
        );
      }
    }

    static assemble(widgetDescriptor) {
      if (widgetDescriptor === null || widgetDescriptor === undefined) {
        throw new Error('A widget descriptor must be provided.');
      }

      if (widgetDescriptor.htmlId === undefined) {
        throw new Error(
          'An "htmlId" must be defined in each widgetSpecification.'
        );
      }

      const widgetBuilder = new WidgetBuilder();
      const node = DomInitialiser.initialiseDomNode(widgetDescriptor);

      let textDataSource = TextDataSourceFactory.makeCoreTextDataSource('');
      if (widgetDescriptor.text !== undefined && widgetDescriptor.text !== null) {
        textDataSource = TextDataSourceFactory.makeCoreTextDataSource(
          widgetDescriptor.text
        );
      }
      WidgetAssemblyDirector.addSourceFilters(
        textDataSource,
        widgetDescriptor.text_character_filters
      );

      let renderStrategy = new SinePhaseFrameRenderStrategy()
      if (widgetDescriptor.renderer !== undefined && widgetDescriptor.renderer !== null) {
        if (widgetDescriptor.renderer.strategy === 'CoSinePhaseFrameRenderStrategy') {
            renderStrategy = new CoSinePhaseFrameRenderStrategy()
        } else if (widgetDescriptor.renderer.strategy === 'SinePhaseFrameRenderStrategy') {
            renderStrategy = new SinePhaseFrameRenderStrategy()
        } else {
            renderStrategy = new RandomizedFrameRenderStrategy()
        }
      }
      
      console.log(renderStrategy);
      
      renderStrategy.setTextDataSource(textDataSource);
      widgetBuilder.setFrameRenderStrategy(renderStrategy);
      widgetBuilder.setTextDataSource(textDataSource);

      return widgetBuilder
        .setTargetNode(node)
        .setRowCount(widgetDescriptor.rows)
        .build();
    }
  });
