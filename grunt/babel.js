module.exports = {
  options: {
    sourceMap: true,
    presets: ['babel-preset-airbnb'],
    minified: false
  },  
  build: {
    files: [
      {
        expand: true,
        cwd: 'src/',
        src: ['*.js'],
        dest: 'tmp/'
      } 
    ]
  },
}
