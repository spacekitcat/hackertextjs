# Hacker Text JS (hackertextjs)   
  
hackertextjs is an animated html/javascript widget library to show matrix esque text for user defined strings.  
It's purpose is to look really cool.   
  
## Demosite  
  
https://spacekitcat.github.io/hackertextjs/demosite/  
  
## Features    
* User defined text.  
* User defined framerate. 
* Optional text filters.
* Supports multiple completely seperate widgets (i.e. different text, framerate etc)  
  
# Status  
[![Test Coverage](https://api.codeclimate.com/v1/badges/937b509c950a1fa54000/test_coverage)](https://codeclimate.com/github/spacekitcat/hackertextjs/test_coverage)  
[![Build Status](https://travis-ci.org/spacekitcat/hackertextjs.svg?branch=master)](https://travis-ci.org/spacekitcat/hackertextjs)  
  
# Usage  
You can add HackerTextJS to your project with NPM, just run the commnds below from your project's directory:  
  
$ npm i hackertextjs --save-dev  
   
You should find hackertext.js, style.css along with a stripped-down example project for reference purposes.  
The snippet under this paragraph demonstrates the elements required to make hackertextjs work in the browser.  
'hacker_text_config' must be defined before including hackertext.js. Each widget entry should define an htmlId,  
text, framerate and rows field. Each htmlId must have a corresponding div block with the same ID. style.css   
must be imported and each widget must use 'hackertext' as its class. The snippet below shows how a html document  
in your projects root directory might make use of hackertextjs:  
  
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title></title>
  <meta charset="UTF-8">
  <script type="text/javascript">
  var hacker_text_config = 
  {
    targets: [{
    htmlId: "hackertext",
    text: "A_SPECTRE_HAUNTS_EUROPE_",
    framerate: 3,
    rows: 15
  },
  {
    htmlId: "hackertexttwo",
    text: "DAISY_DAISY_",
    framerate: 5,
    rows: 15
  },
  {
    htmlId: "hackertextthree",
    text: "DONT_FEAR_PERFECTION_YOULL_NEVER_MEET_IT_",
    framerate: 5,
    text_character_filters: ['LeetSourceFilter'], 
    rows: 18
  }]};
  </script>
  <script
    src="http://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha256-3edrmyuQ0w65f8gfBsqowzjJe2iM6n0nKciPUp8y+7E="
    crossorigin="anonymous">
  </script>
  <script type="text/javascript" src="node_modules/hackertextjs/hackertext.js">
  </script>
  <link rel="stylesheet" href="node_modules/hackertextjs/style.css">
</head>
<body>
  <div class="hackertext" id="hackertext"></div>
  <div class="hackertext" id="hackertexttwo"></div>
  <div class="hackertext" id="hackertextthree"></div>
</body>
</html>
```
## Text source filters  
You can specify filters that act on each individual source character before displaying them on a Widget.  
I use the indefinite article, but the definite article would be more accurate! LeetSourceFilter is the  
only filter created so far, but the functionality is brand new, so I expect to add more in the future.  
The third widget above demonstrates the use of LeetSourceFilter.  
  
## Building  
$ cd hackertextjs  
$ npm i grunt-cli -g  
$ npm i  
$ npx grunt  
  
  
The demosite above shows hacktextjs in action with a production build (minified, transpiled to ES5 etc) artefact.  
The source code for the demo is in the repository under the demosite/ folder.  
  
## Testing  (Unit tests)  
The unit tests are ran as part of the Grunt build and run against the raw ES6 source code, but Karma can be ran separately (after doing a build) during development.  
Karma will watch the source for changes and will automatically rerun the tests every time you save a file.  Pretty neat.  
$ karma start  

## Testing (Integration tests)  
The integration tests are ran as part of the Grunt build and run against the final hackertextjs file. Nightwatch will boot the application and check that the frame arithmetic makes sense and that the widget actually animates. It'll do basic smoke test essentially.    
  
N.B. Requires a local install of Firefox (and make sure it's the latest version).   
   
## License  
Copyright (c) 2018 spacekitcat  
Licensed under the MIT license. 
   
