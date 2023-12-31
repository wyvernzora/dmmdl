const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'dmmdl.js',
    path: path.resolve(__dirname, 'dist'),
    library: "dmmdl",
  },
  optimization: {
    minimize: false,
  }
};
