define('DocumentEventObservable', [], () =>
  class DocumentEventObservable {
    constructor() {
      this.observers = [];
    }

    attach(observer) {
      if (observer === undefined || observer === null) {
        throw new TypeError('Observer object cannot be null.');
      }

      if (!(observer.notify instanceof Function)) {
        throw new TypeError('Observer objects must define a notify function.');
      }

      this.observers.push(observer);
    }

    detach(observer) {
      if (observer === undefined || observer === null) {
        throw new TypeError('Observer object cannot be null.');
      }

      // Delete the element from this.observers
      const index = this.observers.indexOf(observer);
      this.observers.splice(index, 1);
    }

    notify() {
      /* Save a reference to 'this' for the forEach callback. The callback becomes
          'this' inside its own scope (rather than the instance of this class). */
      const thisReference = this;
      this.observers.forEach((element) => {
        element.notify(thisReference);
      });
    }

    getObservers() {
      return this.observers;
    }
  });
