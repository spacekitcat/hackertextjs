define('WidgetBuilder', ['FrameRendererBuilder', 'Widget'], (
  FrameRendererBuilder,
  Widget
) =>
  class WidgetBuilder {
    constructor(targetNode) {
      this.frameRendererBuilder = new FrameRendererBuilder();
      this.targetNode = targetNode;
      this.rowCount = undefined;
    }

    build() {
      const widget = new Widget(
        this.targetNode,
        this.frameRendererBuilder.build()
      );
      if (this.rowCount !== undefined) {
        widget.setRowCount(this.rowCount);
        this.rowCount = undefined;
      }
      return widget;
    }

    setTextDataSource(text) {
      this.frameRendererBuilder.setTextDataSource(text);
      return this;
    }

    setOptions(options) {
      this.frameRendererBuilder.setOptions(options);
      return this;
    }

    setRowCount(rowCount) {
      this.rowCount = rowCount;
      return this;
    }

    setTargetNode(targetNode) {
      this.targetNode = targetNode;
      return this;
    }
  });
