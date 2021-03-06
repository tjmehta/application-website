var path = require('path')
var webpack = require('webpack')

module.exports = {
  // or devtool: 'eval' to debug issues with compiled output:
  devtool: 'source-map',
  entry: [
    // necessary for hot reloading with IE:
    'eventsource-polyfill',
    // listen to code updates emitted by hot middleware:
    'webpack-hot-middleware/client',
    // your code:
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/bundle.js',
    publicPath: '/-/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },
    // globally expose React and React.Component to reduce boilerplate
    {
      test: /\.css$/,
      loader: 'style!css'
    },
    {
      test: /\.json$/,
      loader: 'json'
    },
		{
			test: require.resolve('react'),
			loader: 'expose?React'
		},
		{
			test: require.resolve('react/lib/ReactComponent'),
			loader: 'expose?Component'
		}]
  },
  resolve: {
		root: path.resolve('./src')
	}
}
