const path = require('path');
const glob = require('glob');

if (typeof process.env.NODE_ENV === 'string') {
  process.env.NODE_ENV = 'production';
}
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const srcDir = './src/assets/scripts';
const entries = glob
  .sync('*.ts', {
    cwd: srcDir,
  })
  .map(function (key) {
    return [key.replace('.ts', ''), path.resolve(srcDir, key)];
  });

const entryObj = Object.fromEntries(entries);

module.exports = {
  entry: entryObj,
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../.tmp/assets/scripts'),
  },
  resolve: {
    alias: {
      AppConfig: path.join(__dirname, `../src/assets/scripts/env/${process.env.NODE_ENV}.ts`),
    },
    extensions: ['.ts', '.js'],
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        use: ['raw-loader'],
        exclude: /node_modules/,
      },
    ],
  },
};
