module.exports = {
  itest: {
    options: {
    port: 8000,
    base: ['libs/', 'dist/'],
    }
  },
  demo: {
    options: {
    port: 8080,
    keepalive: true,
    base: ['libs/', 'dist/'],
    }
  }
}
