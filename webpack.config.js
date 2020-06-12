const path = require( "path" );
const FriendlyErrorsWebpackPlugin = require( "friendly-errors-webpack-plugin" );
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PostcssModulesValues = require('postcss-modules-values');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Autoprefixer = require('autoprefixer');

const plugins = [
  new FriendlyErrorsWebpackPlugin(),
  PostcssModulesValues,
  new MiniCssExtractPlugin({
    filename: "[name].css"
  }),
  Autoprefixer,
  new OptimizeCssAssetsPlugin({
    cssProcessor: require('cssnano'),
    cssProcessorPluginOptions: {
      preset: 'default',
    },
    canPrint: true
  }),
];

module.exports = {
  mode: "production",

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx"]
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
              importLoaders: 1,
              sourceMap: true,
            }
          },
          'postcss-loader',
        ],
      }
    ]
  },
  output: {
    path: path.resolve( __dirname, "./assets/" ),
    filename: "main.js",
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  plugins,
};