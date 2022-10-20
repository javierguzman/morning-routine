import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export default (env, argv) => {
  const browser = env.target;
  return {
    entry: {
      options: path.resolve('src/options/options.ts'),
      background: path.resolve('src/background/background.ts'),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
          type: 'asset/resource'
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve('static/icons'),
            to: path.resolve(`dist/${browser}/icons`),
          },
          {
            from: path.resolve('src/options/options.html'),
            to: path.resolve(`dist/${browser}/options.html`),
          },
          {
            from: path.resolve('src/options/options.css'),
            to: path.resolve(`dist/${browser}/options.css`),
          },
          {
            from: path.resolve(`target/${browser}/manifest.json`),
            to: path.resolve(`dist/${browser}/manifest.json`),
          }
        ]
      })
    ],
    output: {
      filename: '[name].js',
      path: path.resolve(`dist/${browser}`),
    }
  };
}
