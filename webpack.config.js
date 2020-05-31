const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var Visualizer = require('webpack-visualizer-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv.development;
  const isEnvProduction = webpackEnv.production;

  return {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    entry: './src/index.js',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: [
            '/node_modules/',
          ],
          use: ['babel-loader']
        },
        //   test: /\.s[ac]ss$/i,
        //   use: [
        //     // Creates `style` nodes from JS strings
        //     'style-loader',
        //     // Translates CSS into CommonJS
        //     'css-loader',
        //     // Compiles Sass to CSS
        //     'sass-loader',
        //   ],
        // },
        {
          test: /\.css(\?|$)/,
          exclude: [
            '/node_modules/',
          ],
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          exclude: [
            '/node_modules/',
          ],
          use: ['babel-loader', '@svgr/webpack'//, 'url-loader'
            // {
            //   loader: 'babel-loader',
            // },
            // {
            //   loader: '@svgr/webpack',
            //   options: {
            //     babel: false,
            //     icon: true,
            //   },
            // },
          ],
        },
        {
          test: /\.(png|jpe?g|woff|woff2|eot|ttf)(\?|$)/,
          exclude: [
            '/node_modules/',
          ],
          use: 'url-loader?limit=100000'
        },
        {
          test: /\.less$/,
          exclude: [
            '/node_modules/',
          ],
          use: [{
            loader: 'style-loader'
          }, {
            loader: 'css-loader'
          }, {
            loader: 'less-loader', options: {
              modifyVars: {
                'font-family': 'open sans-regular',
                '@font-size-base': '13px',
                'primary-color': '#19b294',
                'link-color': '#1DA57A',
                'border-radius-base': '5px',
                'menu-dark-bg': '#323E59',
                'menu-dark-submenu-bg': '#2b3951',
                'menu-dark-item-active-bg': '#2B3951',
                'menu-dark-highlight-color': '#fff',
                'layout-sider-background': '#323E59',
                'layout-trigger-background': '#323E59',
                'table-header-bg': '#fff',
                'table-header-sort-bg': '#fff',
                'carousel-dot-width': '10px',
                'carousel-dot-height': '10px',
                'carousel-dot-active-width': '10px',
                'tabs-hover-color': '#505051', //505051
                'tabs-highlight-color': '#505051',
                'table-row-hover-bg': '#F5F6F8'
              },
              javascriptEnabled: true,
            }
          }]
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      //publicPath: '/',
      filename: isEnvDevelopment ? `[name]-v${pkg.version}_[hash].js` : `[name]-v${pkg.version}_[contenthash:8].js`
      //filename: `[name]-v${pkg.version}_[hash].js`
    },
    // performance: {
    //   maxAssetSize: 3000000
    // },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace('@', '')}`;
            },
          },
        },
      },
    },
    plugins: [
      //new webpack.EnvironmentPlugin({ ...process.env }),
      isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      isEnvDevelopment && new Dotenv(),
      new HtmlWebpackPlugin({
        title: 'WhatYouNeed',
        template: './src/template.html'
      }),
      isEnvDevelopment && new Visualizer({
        filename: './statistics.html'
      }),
    ].filter(Boolean),
    devServer: {
      //host: '10.0.3.232',
      contentBase: path.resolve(__dirname, 'dist'),
      hot: !isEnvProduction
    }
  }
};
