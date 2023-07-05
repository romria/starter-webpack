module.exports = {
  parser: 'postcss-scss',
  plugins: [
    require('postcss-import'),
    require('postcss-simple-vars'),
    require('postcss-preset-env')({ browsers: ['> 0.5%', 'last 2 versions', 'Firefox ESR', 'not dead'] })
  ]
};
