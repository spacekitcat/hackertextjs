define('DomInitialiser', [], () =>
  class DomInitialiser {
    static buildIdSelector(selectorLabel) {
      let selector = selectorLabel;
      if (!selectorLabel.startsWith('#')) {
        selector = `#${selectorLabel}`;
      }

      return selector;
    }

    static initialiseDomNode(widgetConfig) {
      if (widgetConfig === undefined || widgetConfig === null) {
        throw new TypeError('Widget config object cannot be null.');
      }

      if (widgetConfig.htmlId === undefined || widgetConfig.htmlId === null) {
        throw new TypeError('widgetConfig.htmlId must be declared.');
      }

      const widgetSelectorQuery = DomInitialiser.buildIdSelector(widgetConfig.htmlId);

      if (widgetSelectorQuery === '#') {
        throw new TypeError('Parameter widgetConfig.htmlId id cannot be blank.');
      }

      const node = $(widgetSelectorQuery);
      if (node.length === 0) {
        throw new TypeError(`DOM does not contain element matching ${widgetSelectorQuery}.`);
      }

      node.addClass('hackertext');

      return node;
    }
  });
