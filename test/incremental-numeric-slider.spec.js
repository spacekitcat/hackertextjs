define(['require', 'chai', 'IncrementalNumericSlider'], function(
  require,
  chai,
  IncrementalNumericSlider
) {
  describe('constructor() from - to validation', () => {
    describe('null, null, null (from, to, step) args', () => {
      it('should throw an error exception', () => {
        assert.throws(() => {
          new IncrementalNumericSlider(null, null, null);
        });
      });
    });

    describe('null, 100, 1 (from, to, step) args', () => {
      it('should throw an error exception', () => {
        assert.throws(() => {
          new IncrementalNumericSlider(null, 100, 1);
        });
      });
    });

    describe('1, null, 1 (from, to, step) args', () => {
      it('should throw an error exception', () => {
        assert.throws(() => {
          new IncrementalNumericSlider(1, null, 1);
        });
      });
    });

    describe('1 100, null (from, to, step) args', () => {
      it('should throw an error exception', () => {
        assert.throws(() => {
          new IncrementalNumericSlider(1, 100, null);
        });
      });
    });

    describe('step > +to - +from', () => {
      it('should throw an error exception', () => {
        assert.throws(() => {
          new IncrementalNumericSlider(5, 10, 6);
        });
      });
    });

    describe('step > +to - -from', () => {
      it('should throw an error exception', () => {
        assert.throws(() => {
          new IncrementalNumericSlider(-4, 1, 6);
        });
      });
    });

    describe('step > -to - -from', () => {
      it('should throw an error exception', () => {
        assert.throws(() => {
          new IncrementalNumericSlider(-10, -5, 6);
        });
      });
    });

    describe('step == +to - +from', () => {
      it('should accept to - from = step', () => {
        assert.doesNotThrow(() => {
          new IncrementalNumericSlider(5, 10, 5);
        });
      });
    });

    describe('step == +to - -from', () => {
      it('should accept to - from = step', () => {
        assert.doesNotThrow(() => {
          new IncrementalNumericSlider(-5, 5, 5);
        });
      });
    });

    describe('step == -to - -from', () => {
      it('should accept to - from = step', () => {
        assert.doesNotThrow(() => {
          new IncrementalNumericSlider(-10, -5, 5);
        });
      });
    });

    describe('given values get set as expected', () => {
      var sut = new IncrementalNumericSlider(5, 10, 5);

      it('set the startAt value', () => {
        expect(sut.getStartAt()).to.equal(5);
      });

      it('set the endAt value', () => {
        expect(sut.getEndAt()).to.equal(10);
      });

      it('set the withStep value', () => {
        expect(sut.getStepWith()).to.equal(5);
      });
    });
  });

  describe('getNext() 0 to 2, step 1 (positive to positive)', () => {
    var sut = new IncrementalNumericSlider(0, 2, 1);

    describe('first call', () => {
      it('it should return 0', () => {
        assert.strictEqual(0, sut.getNext());
      });
    });

    describe('second call', () => {
      it('it should return 1', () => {
        assert.strictEqual(1, sut.getNext());
      });
    });

    describe('third call', () => {
      it('it should return 2', () => {
        assert.strictEqual(2, sut.getNext());
      });
    });

    describe('fourth call', () => {
      it('it should loop back around to 0', () => {
        assert.strictEqual(0, sut.getNext());
      });
    });
  });

  describe('getNext() 0 to 7, step 3 (positive to positive)', () => {
    var sut = new IncrementalNumericSlider(0, 7, 3);

    describe('first call', () => {
      it('it should return 0', () => {
        assert.strictEqual(0, sut.getNext());
      });
    });

    describe('second call', () => {
      it('it should return 3', () => {
        assert.strictEqual(3, sut.getNext());
      });
    });

    describe('third call', () => {
      it('it should return 6', () => {
        assert.strictEqual(6, sut.getNext());
      });
    });

    describe('fourth call', () => {
      it('it should loop back around to 1', () => {
        assert.strictEqual(1, sut.getNext());
      });
    });
  });

  describe('getNext() 0.97 to 0.99, step 0.01 (positive decimal to positive decimal)', () => {
    var sut = new IncrementalNumericSlider(0.97, 0.99, 0.01);

    describe('first call', () => {
      it('it should return 0.97', () => {
        assert.strictEqual(0.97, sut.getNext());
      });
    });

    describe('second call', () => {
      it('it should return 0.98', () => {
        assert.strictEqual(0.98, sut.getNext());
      });
    });

    describe('third call', () => {
      it('it should return 0.99', () => {
        assert.strictEqual(0.99, sut.getNext());
      });
    });

    describe('fourth call', () => {
      it('it should return 0.97', () => {
        assert.strictEqual(0.97, sut.getNext());
      });
    });
  });

  describe('getNext() -1 to 1, step 1 (negative to positive)', () => {
    var sut = new IncrementalNumericSlider(-1, 1, 1);

    describe('first call', () => {
      it('it should return -1', () => {
        assert.strictEqual(-1, sut.getNext());
      });
    });

    describe('second call', () => {
      it('it should return 0', () => {
        assert.strictEqual(0, sut.getNext());
      });
    });

    describe('third call', () => {
      it('it should return 1', () => {
        assert.strictEqual(1, sut.getNext());
      });
    });

    describe('fourth call', () => {
      it('it should loop back around to -1', () => {
        assert.strictEqual(-1, sut.getNext());
      });
    });
  });

  describe('getNext() -5 to 6, step 5 (negative to positive)', () => {
    var sut = new IncrementalNumericSlider(-5, 6, 5);

    describe('first call', () => {
      it('it should return -5', () => {
        assert.strictEqual(-5, sut.getNext());
      });
    });

    describe('second call', () => {
      it('it should return 0', () => {
        assert.strictEqual(0, sut.getNext());
      });
    });

    describe('third call', () => {
      it('it should return 5', () => {
        assert.strictEqual(5, sut.getNext());
      });
    });

    describe('fourth call', () => {
      it('it should loop back around to -2', () => {
        assert.strictEqual(-2, sut.getNext());
      });
    });
  });

  describe('getNext() -4 to -2, step 1 (negative to negative)', () => {
    var sut = new IncrementalNumericSlider(-4, -2, 1);

    describe('first call', () => {
      it('it should return -4', () => {
        assert.strictEqual(-4, sut.getNext());
      });
    });

    describe('second call', () => {
      it('it should return -3', () => {
        assert.strictEqual(-3, sut.getNext());
      });
    });

    describe('third call', () => {
      it('it should return -2', () => {
        assert.strictEqual(-2, sut.getNext());
      });
    });

    describe('fourth call', () => {
      it('it should loop back around to -4', () => {
        assert.strictEqual(-4, sut.getNext());
      });
    });
  });

  describe('getNext() -14 to -2, step 7 (negative to negative)', () => {
    var sut = new IncrementalNumericSlider(-14, -2, 7);

    describe('first call', () => {
      it('it should return -14', () => {
        assert.strictEqual(-14, sut.getNext());
      });
    });

    describe('second call', () => {
      it('it should return -7', () => {
        assert.strictEqual(-7, sut.getNext());
      });
    });

    describe('third call', () => {
      it('it should loop back around to -13', () => {
        assert.strictEqual(-13, sut.getNext());
      });
    });

    describe('fourth call', () => {
      it('it should loop back around to -6', () => {
        assert.strictEqual(-6, sut.getNext());
      });
    });
  });

  describe('reset() 7 to 10 step 7', () => {
    var sut = new IncrementalNumericSlider(7, 10, 1);

    describe('reset immedietly after construction, returns 7', () => {
      sut.reset();
      assert.strictEqual(7, sut.getNext());
    });

    describe('reset immedietly after one call to getNext() construction, returns 7', () => {
      sut.getNext();
      sut.reset();
      assert.strictEqual(7, sut.getNext());
    });
  });
});
