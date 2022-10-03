const path = require('path')

const outputPath = path.resolve(__dirname, '../src/main/resources/static')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'production',
  output: {
    path: outputPath,
    filename: '[name].js'
  },
  plugins : [
    new BundleAnalyzerPlugin()
  ]
}
