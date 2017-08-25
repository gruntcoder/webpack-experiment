const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const { AureliaPlugin } = require('aurelia-webpack-plugin');

function isExternal(module) {
  var context = module.context;

  if (typeof context !== 'string') {
    return false;
  }

  return context.indexOf('node_modules') !== -1;
}

const modules = {
  rules: [{
    test: /\.js$/,
    //exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['env'],
        plugins: [
          'transform-runtime'
        ]
      }
    }
  }]
};

let serverConfig = {
  target: 'node',
  entry: {
    app: './src/server.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.node.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env'],
          plugins: [
            'transform-runtime'
          ]
        }
      }
    }]
  }
};

var clientConfig = {
  target: 'web',
  entry: {
    app: './src/client.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new AureliaPlugin(),
    new CommonsChunkPlugin({
      name: 'vendors',
      minChunks: function(module) {
        return isExternal(module);
      }
    })
  ]
};


let workerConfig = {
  target: 'webworker',
  entry: {
    app: './src/worker.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.worker.js'
  }
};



module.exports = [serverConfig, clientConfig, workerConfig];
