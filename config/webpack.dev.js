var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../src', 'index.js'),
  output: { //输出文件的相关配置
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'bundle.js', //文件名称
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
                  limit: 512,
                  name: '[hash:8].[ext]',
                  useRelativePath: false,
                  outputPath: function(fileName){
                      return 'assets/images/'+fileName
                  }
              }
          },
          {
              loader:'image-webpack-loader'
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
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    hot: true,
    historyApiFallback: true,
    compress: true
  },
  
  plugins: [
    // 自动生成基本的 html 页面
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      title: 'wedding',        // 文件的标题
      filename: 'index.html', // 文件名
      // favicon: '../src/demo.png'          // 网页图标
    }),

    // 热更新
    new webpack.HotModuleReplacementPlugin()
  ],
};