const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const resolve = name => path.resolve(__dirname, name)
const publicPath = '/'
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: resolve('build'), // 绝对路径
    filename: 'static/js/bundle.js',
    pathinfo: true,
    publicPath: publicPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ],
    splitChunks: {
      // include all types of chunks
      chunks: 'all'
    }
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        template: './public/_index.html',
        filename: 'index.html'
      }
    )
  ],
  devServer: {
    port: 8080,
    compress: true,
    contentBase: 'public',
    watchContentBase: true,
    hot: true,
    publicPath: publicPath,
    host: '127.0.0.1',
    proxy: {
      '/user': {
        target: 'http://localhost:9093'
      }
    }
  }
}
