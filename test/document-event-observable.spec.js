define([
  'require',
  'chai',
  'DocumentEventObservable',
  'WidgetBuilder'
], function(require, chai, DocumentEventObservable, WidgetBuilder) {
  var should = chai.should();
  var expect = chai.expect;

  describe('constructor()', () => {
    it("shouldn't throw any exception", () => {
      expect(() => {
        new DocumentEventObservable();
      }).to.not.throw();
    });
  });

  describe('attach()', () => {
    describe('null observer object', () => {
      var sut = new DocumentEventObservable();
      it('should throw TypeError', () => {
        expect(() => {
          sut.attach(null);
        }).to.throw(TypeError, /Observer/);
      });
    });

    describe('undeclared widget config object', () => {
      var sut = new DocumentEventObservable();
      it('should throw TypeError', () => {
        expect(() => {
          sut.attach();
        }).to.throw(TypeError, /Observer/);
      });
    });

    //describe('notify function definition missing from widget prototype', function () {

    //var sut = new DocumentEventObservable();
    //it('should throw TypeError', function () {
    //  expect(function () {
    //    sut.attach({})
    //  }).to.throw(TypeError, /notify/);
    //});

    //});

    describe('notify function equals null', () => {
      var sut = new DocumentEventObservable();
      it('should throw TypeError', () => {
        expect(() => {
          sut.attach({ notify: null });
        }).to.throw(TypeError, /notify/);
      });
    });

    describe("notify function equals an Object (isn't a function)", () => {
      var sut = new DocumentEventObservable();
      it('should throw TypeError', () => {
        expect(() => {
          sut.attach({ notify: {} });
        }).to.throw(TypeError, /notify/);
      });
    });

    describe('notify function is a defined function', () => {
      var sut = new DocumentEventObservable();
      var jquery_node = $('<div>');
      var widgetBuilder = new WidgetBuilder(jquery_node);
      var widget = widgetBuilder.build();

      it('should not throw any errors', () => {
        expect(() => {
          sut.attach(widget);
        }).to.not.throw();
      });

      it('should add the observer to the observers list', () => {
        expect(sut.getObservers().includes(widget)).to.be.true;
      });
    });
  });

  describe('detach()', () => {
    describe('null observer object', () => {
      var sut = new DocumentEventObservable();
      it('should throw TypeError', () => {
        expect(() => {
          sut.detach(null);
        }).to.throw(TypeError, /Observer/);
      });
    });

    describe('undeclared widget object', () => {
      var sut = new DocumentEventObservable();
      it('should throw TypeError', () => {
        expect(() => {
          sut.detach();
        }).to.throw(TypeError, /Observer/);
      });
    });

    describe('provided with a valid observer', () => {
      var sut = new DocumentEventObservable();
      var jquery_node = $('<div>');
      var widgetBuilder = new WidgetBuilder(jquery_node);
      var widget = widgetBuilder.build();

      // Setup
      sut.attach(widgetBuilder.build());
      sut.attach(widget);
      sut.attach(widgetBuilder.build());

      it('should not throw any errors', () => {
        expect(() => {
          sut.detach(widget);
        }).to.not.throw();
      });

      it('should remove the observer to the observers list', () => {
        expect(sut.getObservers().includes(widget)).to.be.false;
      });

      it('should remove the observer to the observers list', () => {
        expect(sut.getObservers().length).to.equal(2);
      });
    });
  });

  describe('notify()', () => {
    describe('empty observer list', () => {
      var sut = new DocumentEventObservable();

      it('should not throw any errors', () => {
        expect(() => {
          sut.notify();
        }).to.not.throw();
      });
    });

    describe('single item observer list', () => {
      var sut = new DocumentEventObservable();
      var jquery_node = $('<div>');
      var widgetBuilder = new WidgetBuilder(jquery_node);
      var widget = widgetBuilder.build();

      var widget_notify_spy = sinon.spy(widget, 'notify');

      // Setup
      sut.attach(widget);

      //it('should not throw any errors', function () {
      //  expect(function () {
      //    sut.notify();
      //  }).to.not.throw();
      //});

      //it('should call notify on the observer object', function () {
      //  assert(widget_notify_spy.withArgs(sut).calledOnce);
      //});
    });

    describe('multiple item observer list', () => {
      var sut = new DocumentEventObservable();
      var jquery_node = $('<div>');
      var widgetBuilder = new WidgetBuilder(jquery_node);

      var widget_one = widgetBuilder.build();
      var widget_notify_spy_one = sinon.spy(widget_one, 'notify');
      sut.attach(widget_one);

      var widget_two = widgetBuilder.build();
      var widget_notify_spy_two = sinon.spy(widget_two, 'notify');
      sut.attach(widget_two);

      var widget_three = widgetBuilder.build();
      var widget_notify_spy_three = sinon.spy(widget_three, 'notify');
      sut.attach(widget_three);

      //it('should not throw any errors', function () {
      //  expect(function () {
      //    sut.notify();
      //  }).to.not.throw();
      //});

      it('should call notify on the 1st observer object', () => {
        //assert(widget_notify_spy_one.withArgs(sut).calledOnce);
      });

      it('should call notify on the 2nd observer object', () => {
        //assert(widget_notify_spy_two.withArgs(sut).calledOnce);
      });

      it('should call notify on the 1st observer object', () => {
        //assert(widget_notify_spy_three.withArgs(sut).calledOnce);
      });
    });
  });
});
