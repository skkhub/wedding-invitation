var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

module.exports = {
  entry: path.resolve(__dirname, '../src/', 'index.js'),
  output: {
    path: path.resolve(__dirname, '..', 'wedding-invitation'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
            {
              loader: 'url-loader',
              options: {
                  limit: 256,
                  name: '[hash:8].[ext]',
                  useRelativePath: false,
                  outputPath: function(fileName){
                      return 'assets/images/'+fileName
                  }
              }
          },
          {
              loader:'image-webpack-loader'
              // loader:'file-loader'
          }
        ]
      },
      {
        test: /\.mp3$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // limit: 512,
              name: '[hash:8].[ext]',
              useRelativePath: false,
              outputPath: function(fileName) {
                  return 'assets/'+fileName
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      title: 'wedding',        // 文件的标题
      filename: 'index.html', // 文件名
      // favicon: '../src/demo.png'          // 网页图标
    }),
    new CopyWebpackPlugin({
      patterns: [{
        context: path.resolve(__dirname, '..'),
        from: 'static'
        // to: 'dist'
      }]
    }),
  ]
};