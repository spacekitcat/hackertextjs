module.exports = {
  build: {
    options: {
      patterns: [
        {
          match: 'hacker_text_js',
          replacement: '../hackertext.js'
        },
        {
          match: 'hacker_text_css',
          replacement: '../style.css'
        },
        {
          match: 'jquery',
          replacement: 'jquery.slim.min.js'
        }
      ]
    },
    files: [
      {expand: true, flatten: true, src: ['examples/**.html'], dest: 'dist/examples/'}
    ]
  }
}
  
