define('AnimationScheduler', ['Widget'], Widget =>
  class AnimationSchedular {
    constructor() {
      this.painters = [];
      this.painterFps = [];
      this.then = null;
    }

    addPainter(framePainter, frameRate) {
      if (framePainter === undefined || framePainter === null) {
        throw new TypeError('Widget instance must be provided.');
      }

      if (!(framePainter instanceof Widget)) {
        throw new TypeError('first argument must be an instance of Widget.');
      }

      if (frameRate === undefined || frameRate === null) {
        throw new TypeError('frameRate value must be provided.');
      }

      // Warn: Little weak design wise, but it's simple
      this.painters.push(framePainter);
      this.painterFps.push({ framerate: frameRate, then: 0, elapsed: 0 });
    }

    getPainters() {
      return this.painters;
    }

    step(timestamp) {
      // TODO: This can be written more clearly.
      for (let i = 0; i < this.painters.length; i += 1) {
        const { framerate } = this.painterFps[i];
        const { then } = this.painterFps[i];
        let { elapsed } = this.painterFps[i];

        elapsed = timestamp - then;
        if (elapsed >= 1000 / framerate) {
          this.painterFps[i].then = timestamp - elapsed % framerate;
          this.painters[i].paint();
        }
        this.painterFps[i].elapsed = elapsed;
      }

      window.requestAnimationFrame(this.step.bind(this));
    }

    init() {
      for (let i = 0; i < this.painters.length; i += 1) {
        this.painters[i].paint();
      }
    }

    start() {
      if (this.painters.length > 0) {
        this.init();
        window.requestAnimationFrame(this.step.bind(this));
      }
    }
  });
