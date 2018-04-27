define('Application', [
  'AnimationScheduler',
  'DocumentEventObservable',
  'TextCharacterWidthCalculator',
  'WidgetAssemblyDirector'
], (
  AnimationScheduler,
  DocumentEventObservable,
  TextCharacterWidthCalculator,
  WidgetAssemblyDirector
) => {
  const documentEventObservable = new DocumentEventObservable();

  function bootstrap() {
    /* eslint-disable camelcase */
    if (typeof hacker_text_config !== 'undefined') {
      const animationScheduler = new AnimationScheduler();
      hacker_text_config.targets.forEach(widgetConfig => {
        try {
          const widget = WidgetAssemblyDirector.assemble(widgetConfig);
          documentEventObservable.attach(widget);
          animationScheduler.addPainter(widget, widgetConfig.framerate);
        } catch (exception) {
          console.log(`Couldn't create widget: ${exception}`);
        }
      });
      /* eslint-disable camelcase */
      animationScheduler.start();

      // Responsibility 3 ("Configure events and observers")
      $(window).resize(() => {
        documentEventObservable.notify();
      });

      $(document).keypress(() => {
        documentEventObservable.notify();
      });

      documentEventObservable.notify();
    } else {
      console.log('Global variable, hacker_text_targets, must be defined.');
      console.log('Please see the README.md for more information.');
    }
  }

  return bootstrap;
});
