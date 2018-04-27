
function verifyElementContents(client, text) {
  for (var i=0; i<text.length; ++i) {
    client.expect.element('#hackertext').text.to.contain(text.charAt(i)).after(1000);
  }
}

module.exports = {
  beforeEach: function(browser, done) {
    browser.resizeWindow(800, 600, done);
  },
  tags: ['hackertext', 'smoketest'],
  'Basic model smoke test' : function (client) {

    client
      .url('http://localhost:8000/examples/SimpleExampleOne.html');

    // Make the sure the test environment makes sense
    client.expect.element('body').to.be.present;
    client.expect.element('#hackertext').to.be.present;

    // Does CSS contain the basic requirements? (or has been included by the test)
    client.expect.element('#hackertext').to.have.css('word-wrap').which.equals('break-word');
    client.expect.element('#hackertext').to.have.css('font-size');
    client.expect.element('#hackertext').to.have.css('font-family');

    // Test needs to provide hackertext element
    client.expect.element('#hackertext').to.be.visible;

    // The characters of A_SPECTRE_HAUNTS_EUROPE_ should
    // all appear within the target div at least once, somewhere
    verifyElementContents(client, 'A_SPECTRE_HAUNTS_EUROPE');

    // Get the result, save it and then check again after a small
    // delay, check that it 'animated'
    client.getText('#hackertext', function(result) {
      client.expect.element('#hackertext').text.to.not.equal(result.value).after(1000);
      verifyElementContents(client, 'A_SPECTRE_HAUNTS_EUROPE');
    });

    // Get the result and check that the length divided by 35 equals the CSS width
    // of the container. The container is dynamically set to a fixed char width
    // using 'ch' units, so the container.length / container.width should equal 35.
    client.getText('#hackertext', function(textResult) {
      client.getAttribute('#hackertext', 'style', function(widthResult) {
        var containerFixedCharWidth = parseInt(widthResult.value.match(/\d+/)[0]);
        this.assert.equal((textResult.value.length / containerFixedCharWidth), 35);
      });
    });

    client.getElementSize('#hackertext', function(element) {
      this.assert.equal(element.value.width < 800, true);
      this.assert.equal(element.value.width > 750, true);
    });
    
  },tags: ['hackertext', 'smoketest'],
  'Resize test' : function (client) {

    for (var i=0; i<20; ++i) {
    client.resizeWindow(800, 600);
    client.resizeWindow(250, 250);
    client.resizeWindow(800, 600);
    }

    // Get the result, save it and then check again after a small
    // delay, check that it 'animated'
    client.getText('#hackertext', function(result) {
      client.expect.element('#hackertext').text.to.not.equal(result.value).after(1000);
      verifyElementContents(client, 'A_SPECTRE_HAUNTS_EUROPE');
    });

    // Get the result and check that the length divided by 35 equals the CSS width
    // of the container. The container is dynamically set to a fixed char width
    // using 'ch' units, so the container.length / container.width should equal 35.
    client.getText('#hackertext', function(textResult) {
      client.getAttribute('#hackertext', 'style', function(widthResult) {
        var containerFixedCharWidth = parseInt(widthResult.value.match(/\d+/)[0]);
        this.assert.equal((textResult.value.length / containerFixedCharWidth), 35);
      });
    });

    client.getElementSize('#hackertext', function(element) {
      this.assert.equal(element.value.width < 800, true);
      this.assert.equal(element.value.width > 750, true);
    });
    
    client.end();
  }

};
