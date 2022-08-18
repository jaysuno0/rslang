import path from 'path';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { fileURLToPath } from 'url';
import modeDev from './webpack.dev.config.js';
import modeProd from './webpack.prod.config.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const baseConfig = {
  entry: path.resolve(dirname, './src/index.ts'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'img',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(dirname, './dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],
};

export default ({ mode }) => {
  const isProductionMode = mode === 'prod';
  let envConfig;

  if (isProductionMode) envConfig = modeProd;
  else envConfig = modeDev;

  return merge(baseConfig, envConfig);
};
