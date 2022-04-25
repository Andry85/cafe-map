const {DefinePlugin} = require('webpack');

module.exports = {
  plugins: [
    new DefinePlugin({
      'process.env.MapboxAccessToken': JSON.stringify(process.env.NODE_ENV == 'production' ? process.env.MapboxAccessTokenProd : process.env.MapboxAccessTokenDev)
    })
  ]
};