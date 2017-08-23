const path = require('path');

const modules = {
  rules: [{
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['env'],
        plugins: ['transform-runtime']
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
  module: modules
};

var clientConfig = {
  target: 'web',
  entry: {
    app: './src/client.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.js'
  }
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
