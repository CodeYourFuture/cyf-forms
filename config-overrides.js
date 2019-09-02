/**
 * This "rewires" some of the default configuration set by Create React App (CRA) 2.
 * @see https://github.com/timarney/react-app-rewired/ for more details
 */

const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')

module.exports = {
  webpack: (config, env) => ({
    ...config,
    plugins: config.plugins.concat([
      new FilterWarningsPlugin({
        exclude: /Conflicting order between/
      })
    ]),
    optimization: {
      ...config.optimization,
      runtimeChunk: false,
      splitChunks: {
        cacheGroups: {
          default: false
        }
      }
    }
  })
}
