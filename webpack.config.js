const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const deps = require('./package.json').dependencies;
const hostUrl = process.env.HOST_REMOTE || 'http://localhost:3000/remoteEntry.js';

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devServer: { port: 3002 },
  resolve: { extensions: ['.tsx', '.ts', '.js'] },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: (process.env.PUBLIC_PATH || '/'),                
    filename: '[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/ }],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'jobsApp',
      filename: 'remoteEntry.js',
      exposes: {
        './Jobs': './src/Jobs',
      },
      shared: {
        react: { singleton: true, requiredVersion: deps.react,  eager: true, },
        'react-dom': { singleton: true, eager: true, requiredVersion: deps['react-dom'] },
      },
        remotes: {
            hostApp: `hostApp@${hostUrl}`,
        },
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
};
