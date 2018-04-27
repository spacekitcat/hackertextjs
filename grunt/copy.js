module.exports = {
  main: {
    files: [
      // includes files within path
      {expand: true, flatten: true, src: ['node_modules/jquery/dist/jquery**'], dest: 'libs/', filter: 'isFile'},
      {
        expand: true,
        flatten: true,
        src: ['node_modules/jquery/dist/jquery.slim.min.js'],
        dest: 'dist/examples/',
        filter: 'isFile'
      },
      {expand: true, flatten: true, src: ['node_modules/requirejs/require**'], dest: 'libs/', filter: 'isFile'},
      {expand: true, flatten: true, src: ['node_modules/almond/almond.js'], dest: 'tmp/', filter: 'isFile'},
      {expand: true, flatten: true, src: ['css/style**'], dest: 'dist/', filter: 'isFile'},
      {expand: true, flatten: true, src: ['README.md'], dest: 'dist/', filter: 'isFile'},
      {expand: true, flatten: true, src: ['LICENSE-MIT'], dest: 'dist/', filter: 'isFile'},
      {expand: true, flatten: true, src: ['package.json'], dest: 'dist/', filter: 'isFile'}
    ],
  },
  demo_libs: {
    files: [
      {
        expand: true,
        flatten: true,
        src: ['dist/**'],
        dest: 'demosite/',
        filter: 'isFile'
      },
    ]
  }
};
