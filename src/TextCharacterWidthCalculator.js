define('TextCharacterWidthCalculator', [], () =>
  class TextCharacterWidthCalculator {
    constructor() {
      this.SAMPLE_STR = 'abcdefghijklmnopqrstvwxyzABCDEFGHIJKLMNOPQRSTVWXYZ_';
    }

    // Hidden node for sampling dimension data
    appendHiddenDomNode(divId) {
      const div = `#${divId}`;

      if ($(div).length === 0) {
        $('body').append(`<span id="${divId}">${this.SAMPLE_STR}</span>`);
      }

      $(div).css('position', 'relative');
      $(div).css('float', 'right');
      $(div).css('visibility', 'hidden');
      $(div).css('margin', '0');
      $(div).css('padding', '0');
    }

    configureSamplerNode() {
      const id = Date.now();
      this.appendHiddenDomNode(id);
      return $(`#${id}`);
    }

    computeAverageCharWidth(node) {
      const sampleNodeWidth = node[0].getBoundingClientRect().width;
      const averageCharWidth = sampleNodeWidth / this.SAMPLE_STR.length;
      // Round the number to two decimal places.
      return Math.round(averageCharWidth * 100) / 100;
    }

    computeFontSize(cssObjectRepresentation) {
      if (cssObjectRepresentation === undefined || cssObjectRepresentation === null) {
        throw new TypeError('CSS object must be provided and cannot be null.');
      }

      const node = this.configureSamplerNode();
      // Applies the client code CSS and gets an 'average' char width.
      node.css(cssObjectRepresentation);
      const averageCharWidth = this.computeAverageCharWidth(node);

      node.remove();

      return averageCharWidth;
    }
  });
