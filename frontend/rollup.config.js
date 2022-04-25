const replace = require('@rollup/plugin-replace').default;

module.exports = {
  plugins: [
    replace({ 
      'process.env.MapboxAccessToken': JSON.stringify(process.env.NODE_ENV == 'production' ? process.env.MapboxAccessTokenProd : process.env.MapboxAccessTokenDev)
    })
  ]
};