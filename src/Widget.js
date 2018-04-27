define('Widget', ['FrameRenderer', 'TextCharacterWidthCalculator'], (
  FrameRenderer,
  TextCharacterWidthCalculator,
) =>
  class Widget {
    constructor(targetNode, renderer) {
      if (targetNode === null || targetNode === undefined) {
        throw new TypeError('Target jQuery element (targetNode) must be provided.');
      }

      if (!(targetNode instanceof jQuery)) {
        throw new TypeError('Target element (targetNode) must be of type jQuery.');
      }

      if (renderer === null || renderer === undefined) {
        throw new TypeError('FrameRenderer (renderer) must be provided.');
      }

      if (!(renderer instanceof FrameRenderer)) {
        throw new TypeError('Renderer (renderer) must be of type FrameRenderer.');
      }

      this.targetNode = targetNode;
      this.renderer = renderer;
      this.rowcount = 42;
      this.textCharacterWidthCalculator = new TextCharacterWidthCalculator();
      this.debug = false;
    }

    paint() {
      const nextFrame = this.renderer.computeNextFrame();
      this.targetNode.html(nextFrame);

      this.computeFrameSize();
    }

    getRenderer() {
      return this.renderer;
    }

    getTargetNode() {
      return this.targetNode;
    }

    getRowCount() {
      return this.rowcount;
    }

    setRowCount(rowcount) {
      if (rowcount === undefined || rowcount === null) {
        throw new TypeError('rowcount parameter must be provided.');
      }

      if (rowcount <= 0) {
        throw new RangeError('rowcount must be a positive integer.');
      }

      this.rowcount = rowcount;
    }

    // TODO: Refactor
    computeFrameSize() {
      this.targetNode.get(0).style.width = '100%';
      const charWidth = this.textCharacterWidthCalculator.computeFontSize(
        this.targetNode.css(['font-size', 'font-family', 'word-wrap']),
      );
      const rowCharCount = Math.round(this.targetNode.width() / charWidth) - 1;
      const frameCharCount = this.getRowCount() * rowCharCount;

      if (this.debug) {
        console.log(`Widget width: ${this.targetNode.width()}`);
        console.log(`Char width: ${charWidth}`);
        console.log(`Row char count: ${rowCharCount}`);
        console.log(`Frame char count: ${frameCharCount}`);
      }

      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

      if (isSafari) {
        this.targetNode.get(0).style.width = `${rowCharCount} ch`;
      } else {
        this.targetNode.get(0).style.width = `${rowCharCount}ch`;
      }
      this.renderer.setFrameSize(frameCharCount);
    }

    notify() {
      console.log('Resize notification received.');
      this.computeFrameSize();
    }
  });
