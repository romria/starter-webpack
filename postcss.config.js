module.exports = {
  parser: 'postcss-scss',
  plugins: [
    require('postcss-import'),
    require('postcss-simple-vars'),
    require('postcss-preset-env')(),
  ],
};
