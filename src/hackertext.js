// While the linter makes good points, its advice would
// stop the code running without going through Babel.
// This project does use Babel, but the raw code will
// still run in the latest Chrome or Firefox.
/* eslint-disable */
require(['Application'], Application => {
  $(window).ready(() => {
    Application();
  });
});
/* eslint-enable */
