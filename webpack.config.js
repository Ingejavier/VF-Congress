
var path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          'css-loader',
          'sass-loader',
        ],
       },
      //  {    
      //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: 'file-loader',
      //   options: {
      //         name: '[name].[ext]',
      //         outputPath: 'font',
      //         esModule: false
      //   }
      // },        
       {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'img',
          regExp: /\/([a-z0-9]+)\/[a-z0-9]+\.png$/,
          name: '[name].[ext]',
        },
      },      
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};