define('WidgetAssemblyDirector', [
  'WidgetBuilder',
  'DomInitialiser',
  'TextDataSourceFactory',
  'RandomizedFrameRenderStrategy',
  'SinePhaseFrameRenderStrategy'
], (
  WidgetBuilder,
  DomInitialiser,
  TextDataSourceFactory,
  RandomizedFrameRenderStrategy,
  SinePhaseFrameRenderStrategy
) =>
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

      const textDataSource = TextDataSourceFactory.makeCoreTextDataSource(
        widgetDescriptor.text
      );
      WidgetAssemblyDirector.addSourceFilters(
        textDataSource,
        widgetDescriptor.text_character_filters
      );

      if (widgetDescriptor.renderer) {
        if (
          widgetDescriptor.renderer.strategy === 'RandomizedFrameRenderStrategy'
        ) {
          widgetBuilder.setFrameRenderStrategy(
            new RandomizedFrameRenderStrategy()
          );
        } else {
          widgetBuilder.setFrameRenderStrategy(
            new SinePhaseFrameRenderStrategy()
          );
        }

        // const RenderStrategy = WidgetAssemblyDirector.instantiateRenderStrategy(
        // 'SinePhaseFrameRenderStrategy'
        // widgetDescriptor.renderer.strategy
        // );
        // console.log('$$$ ', widgetDescriptor.renderer.strategy);
        // console.log('Loaded >>>', new RenderStrategy().render);

        // widgetBuilder.setTextDataSource(textDataSource);
      }

      return widgetBuilder
        .setTargetNode(node)
        .setRowCount(widgetDescriptor.rows)
        .setTextDataSource(textDataSource)
        .build();
    }
  });
