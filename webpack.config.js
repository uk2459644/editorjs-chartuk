var webpack = require("webpack");
const path = require('path');

module.exports = (env, argv) => {
    const { mode } = argv;
  
    return {
      entry:'./src/index',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                // query: {
                //   presets: ['@babel/preset-env'],
                // },
                options: {
                    presets: ['@babel/preset-env']
                  },

              },
            ],
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.svg$/,
            loader: 'raw-loader'
           
          },
        ],
      },
      output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: mode === 'production' ? 'bundle.js' : `${mode}.bundle.js`,
        library: 'Chart',
        libraryTarget: 'umd',
        libraryExport: 'default',
      },
    };
  };