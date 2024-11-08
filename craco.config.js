module.exports = {
  webpack: {
    configure: {
      output: {
        publicPath: '{VENDOR_SOURCE}',
        filename: "static/js/[name].js",
      },
      optimization: {
        minimize: process.env.UNMINIFIED ? false : true,
        runtimeChunk: false,
        splitChunks: {
          chunks(chunk) {
            return false;
          },
          cacheGroups: {
            default:false
          }
        },
      },
    },
  },
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          webpackConfig.plugins[5].options.filename = "static/css/[name].css";
          return webpackConfig;
        },
      },
      options: {},
    },
  ],
};