module.exports = {
  mode: "development",
  entry: "./app/App.js",
  output: {
    filename: "public/bundle.js"
  },
  module: {
      rules: [
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: true,
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
  devtool: "eval-source-map"
};
