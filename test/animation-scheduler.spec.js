define(['require', 'chai', 'AnimationScheduler', 'Widget', 'lolex'], function(
  require,
  chai,
  AnimationScheduler,
  Widget,
  lolex
) {
  var should = chai.should();
  var expect = chai.expect;

  var clock = lolex.install({
    now: 0,
    shouldAdvanceTimer: true,
    advanceTimeDelta: 200,
    loopLimit: 10
  });

  var frame_painter_stub = sinon.createStubInstance(Widget);

  describe('constructor()', () => {
    describe('minimal valid constructor arguments', () => {
      it("shouldn't throw any exception", () => {
        expect(() => {
          new AnimationScheduler();
        }).to.not.throw();
      });
    });
  });

  describe('addPainter()', () => {
    describe('valid arguments provided', () => {
      var sut = new AnimationScheduler();
      sut.addPainter(frame_painter_stub, 6);

      it('should bring Widget list to a size of one', () => {
        expect(sut.getPainters().length).to.equal(1);
      });

      it('should add the correct item to its internal list', () => {
        expect(sut.getPainters()[0]).to.equal(frame_painter_stub);
      });
    });

    describe('No arguments provided', () => {
      var sut = new AnimationScheduler();

      it('should throw a TypeError exception', () => {
        expect(() => {
          sut.addPainter();
        }).to.throw(TypeError, /Widget/);
      });
    });

    describe('literal undefined arguments provided', () => {
      var sut = new AnimationScheduler();

      it('should throw a TypeError exception', () => {
        expect(() => {
          sut.addPainter(undefined, undefined);
        }).to.throw(TypeError, /Widget/);
      });
    });

    describe('null arguments provided', () => {
      var sut = new AnimationScheduler();

      it('should throw a TypeError exception', () => {
        expect(() => {
          sut.addPainter(null, null);
        }).to.throw(TypeError, /Widget/);
      });
    });

    describe('literal undefined Widget provided', () => {
      var sut = new AnimationScheduler();

      it('should throw a TypeError exception', () => {
        expect(() => {
          sut.addPainter(undefined, 5);
        }).to.throw(TypeError, /Widget/);
      });
    });

    describe('literal undefined framerate value provided', () => {
      var sut = new AnimationScheduler();

      it('should throw a TypeError exception', () => {
        expect(() => {
          sut.addPainter(frame_painter_stub, undefined);
        }).to.throw(TypeError, /frameRate/);
      });
    });

    describe('null Widget provided', () => {
      var sut = new AnimationScheduler();

      it('should throw a TypeError exception', () => {
        expect(() => {
          sut.addPainter(null, 5);
        }).to.throw(TypeError, /Widget/);
      });
    });

    describe('incorrect type for Widget provided', () => {
      var sut = new AnimationScheduler();

      it('should throw a TypeError exception', () => {
        expect(() => {
          sut.addPainter({}, 5);
        }).to.throw(TypeError, /Widget/);
      });
    });

    describe('null framerate value provided', () => {
      var sut = new AnimationScheduler();

      it('should throw a TypeError exception', () => {
        expect(() => {
          sut.addPainter(frame_painter_stub, null);
        }).to.throw(TypeError, /frameRate/);
      });
    });
  });

  describe('start()', () => {
    describe('has zero painter objects', () => {
      var sut;

      beforeEach(() => {
        sut = new AnimationScheduler();

        frame_painter_stub.paint.reset();
        sut.start();
        clock.tick(2000);
      });

      it('zero calls to window.requestAnimationFrame', () => {
        expect(frame_painter_stub.paint.callCount).to.equal(0);
      });
    });

    describe('has a single 5 FPS painter object', () => {
      var sut;
      beforeEach(() => {
        sut = new AnimationScheduler();
        frame_painter_stub.paint.reset();
        clock.reset();
        sut.addPainter(frame_painter_stub, 5);
        sut.start();

        // Ask lolex to fake 2 seconds worth of time
        clock.tick(2000);
      });

      it('should request (timeframe x fps) + 1 = ((2*5 FPS) + 1)', () => {
        expect(frame_painter_stub.paint.callCount).to.equal(11);
      });
    });

    describe('has a single 9 FPS painter object', () => {
      var sut;
      beforeEach(() => {
        sut = new AnimationScheduler();
        frame_painter_stub.paint.reset();
        clock.reset();
        sut.addPainter(frame_painter_stub, 9);
        sut.start();

        // Ask lolex to fake 2 seconds worth of time
        clock.tick(2000);
      });

      it('should request (timeframe x fps) + 1 = ((2*9 FPS) + 1)', () => {
        expect(frame_painter_stub.paint.callCount).to.equal(19);
      });
    });
  });

  describe('has a 3 FPS and a 6 FPS painter object', () => {
    var sut;
    var second_frame_painter_stub;
    beforeEach(() => {
      sut = new AnimationScheduler();
      frame_painter_stub.paint.reset();
      clock.reset();

      second_frame_painter_stub = sinon.createStubInstance(Widget);

      sut.addPainter(frame_painter_stub, 3);
      sut.addPainter(second_frame_painter_stub, 6);

      sut.start();

      // Ask lolex to fake 2 seconds worth of time
      clock.tick(2000);
    });

    it('should request (timeframe x fps) + 1 = ((2*3 FPS) + 1)', () => {
      expect(frame_painter_stub.paint.callCount).to.equal(7);
    });

    it('should request (timeframe x fps) + 1 = ((2*6 FPS) + 1)', () => {
      expect(second_frame_painter_stub.paint.callCount).to.equal(13);
    });
  });
});
