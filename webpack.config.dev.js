var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  cache: true,
  debug: true,
  devtool: "cheap-module-eval-source-map",
  entry: {
    "app": [
      "eventsource-polyfill", // necessary for hot reloading with IE
      "webpack-hot-middleware/client",
      "./src/index.js"]
  },
  output: {
    path: path.join(__dirname, "./dist/static"),
    filename: "[name].js",
    publicPath: "/static/"
  },
  resolve: {
    extensions: ["", ".js", ".jsx", ".css", ".less"],
    alias: {
      "src": __dirname + "/src"
    }
  },
  module: {
    loaders: [{
      test: /\.jsx?/,
      loaders: ["babel"],
      exclude: /node_modules/
    },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: "json-loader",
        include: path.join(__dirname, "src")
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&minetype=application/font-woff",
        include: path.join(__dirname, "src")
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&minetype=application/font-woff",
        include: path.join(__dirname, "src")
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&minetype=application/octet-stream",
        include: path.join(__dirname, "src")
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file",
        include: path.join(__dirname, "src")
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&minetype=image/svg+xml",
        include: path.join(__dirname, "src")
      },
      {
        test: /.*\.(gif|png|jpe?g)$/i,
        loader: "url-loader?mimetype=image/png",
        include: path.join(__dirname, "src")
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style","css-loader!less-loader"),
        include: [
          path.join(__dirname, "src/assets/style"),
          path.join(__dirname,"node_modules/antd")
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", "css"),
        include: path.join(__dirname, "src/assets")
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", "css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"),
        include: path.join(__dirname, "src/components")
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css", {
      disable: false,
      allChunks: true
    }),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("dev")
      }
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

