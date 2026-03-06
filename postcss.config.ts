import postcssImport from 'postcss-import';
import postcssSimpleVars from 'postcss-simple-vars';
import postcssPresetEnv from 'postcss-preset-env';

export default {
  parser: 'postcss-scss',
  plugins: [postcssImport, postcssSimpleVars, postcssPresetEnv()],
};
