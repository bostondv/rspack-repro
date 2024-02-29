import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import rspack from '@rspack/core'
import ReactRefreshPlugin from '@rspack/plugin-react-refresh'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error("Unknown bundler");
}

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  mode: "development",
  devtool: 'eval-cheap-module-source-map',
  entry: {
    main: "./src/index",
  },
  plugins: [new HtmlWebpackPlugin(), new rspack.HotModuleReplacementPlugin(),
    new ReactRefreshPlugin(),],
  optimization: {
    minimize: false,
    mergeDuplicateChunks: false,
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
    splitChunks: {
      chunks: 'all',
      maxAsyncRequests: 5,
      maxInitialRequests: 5,
      minChunks: 1,
      minSize: 1,
      name: false,
    },
  },
  output: {
    clean: true,
    path: isRunningWebpack
      ? path.resolve(__dirname, "webpack-dist")
      : path.resolve(__dirname, "rspack-dist"),
    // filename: "[name].js",
    // chunkFilename: '[name].chunk.js',
    filename: '[name].webpack_bundle-[contenthash].js',
    chunkFilename: '[name]-[contenthash].webpack_chunk.js',
  },
  experiments: {
    css: true,
  },
  module: {
    rules: [
      {
        test: /(\.(t|j)sx?$)/,
        exclude: [/node_modules/],
        include: [path.resolve(__dirname, "src")],
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: false,
              cacheCompression: false,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'entry',
                    corejs: '3.27',
                    modules: false,
                    include: ['transform-classes'],
                  },
                ],
                ['@babel/react', { runtime: 'automatic', importSource: '@emotion/react' }],
                '@babel/preset-typescript',
              ],
              plugins: [
                '@babel/plugin-syntax-dynamic-import',
                'graphql-tag',
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                [
                  '@emotion',
                  {
                    sourceMap: true,
                    autoLabel: 'never',
                    labelFormat: '',
                    cssPropOptimization: true,
                  },
                ],
              ],
              assumptions: {
                privateFieldsAsProperties: true,
                setPublicClassFields: true,
              },
            },
          },
        ],
      },
    ]
  },
};

export default config;
