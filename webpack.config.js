const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    /* path: path.resolve(__dirname, 'dist'),
    filename: 'main.js', */
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js',
    /* publicPath: './' */
  },
  mode: 'development',

  devServer: {
         contentBase: './public',
         historyApiFallback: true,
  },

  module: {
      rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
          {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  outputPath: 'images',
                },
              },
            ],
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: 'src/index.html',
        favicon: './images/favicon/favicon.png'
    })
  ]
};