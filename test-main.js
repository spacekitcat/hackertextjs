var tests = [];
for (var file in window.__karma__.files) {
  if (/.spec\.js$/.test(file)) {
    tests.push(file);
  }
}

requirejs.config({
  baseUrl: '/base/src',

  paths: {
    'chai': '../node_modules/chai/chai',
    'path': '../node_modules/path/path',
    'lolex': '../node_modules/lolex/lolex'
  },

  deps: tests,
  callback: window.__karma__.start
});

