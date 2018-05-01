define('WidgetAssemblyDirector', [
  'WidgetBuilder',
  'DomInitialiser',
  'TextDataSourceFactory'
], (WidgetBuilder, DomInitialiser, TextDataSourceFactory) =>
  class WidgetAssemblyDirector {
    static instantiateSourceFilter(filterName) {
      try {
        return require(filterName);
      } catch (exception) {
        console.log(exception);
        throw new Error(`The filter '${filterName}' could not be loaded.`);
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

      if (widgetDescriptor.renderer) {
        const renderStrategy = WidgetAssemblyDirector.instantiateRenderStrategy(
          // 'SinePhaseFrameRenderStrategy'
          widgetDescriptor.renderer.renderStrategy
        );

        console.log('Loaded >>>', renderStrategy);
      }
      const textDataSource = TextDataSourceFactory.makeCoreTextDataSource(
        widgetDescriptor.text
      );
      WidgetAssemblyDirector.addSourceFilters(
        textDataSource,
        widgetDescriptor.text_character_filters
      );

      return widgetBuilder
        .setTargetNode(node)
        .setRowCount(widgetDescriptor.rows)
        .setTextDataSource(textDataSource)
        .build();
    }
  });
