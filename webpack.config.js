const path = require('path');
const subscript = require('markdown-it-sub');
const superscript = require('markdown-it-sup');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.pug"),
      filename: "index.html",
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "public", to: "" },
      ],
    }),
  ],
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
    // Add support for TypeScripts fully qualified ESM imports.
    extensionAlias: {
     ".js": [".js", ".ts"],
     ".cjs": [".cjs", ".cts"],
     ".mjs": [".mjs", ".mts"]
    }
  },
  module: {
    rules: [
      { 
        test: /\.([cm]?ts|tsx)$/,
        loader: "ts-loader"
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test:   /\.md/,
        loader: 'markdown-it',
        options: {
          preset: 'default',
          typographer: true,
          use: [subscript, superscript]
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.pug$/,
        include: path.resolve(__dirname),
        use: [
          {
            loader: "pug-loader",
          },
        ],
      },
    ],
  },
  output: {
    chunkFilename: '[name].js',
    filename: '[name].js'
  },
};
