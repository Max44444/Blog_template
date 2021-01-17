const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLPlugin = require('html-webpack-plugin');

const cssLoaders = extra => {
  const loaders = [{
    loader: MiniCssExtractPlugin.loader, 
    options: { 
      publicPath: '', 
    }
  }, 'css-loader'];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: __dirname + '/dist'
  },
  plugins: [
    new HTMLPlugin({
      filename: 'index.html',
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: false,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: cssLoaders() 
      }
    ]
  }
}