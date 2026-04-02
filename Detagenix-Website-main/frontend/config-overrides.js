const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function override(config, env) {
  // Check if we're building admin
  const isAdmin = process.env.BUILD_ADMIN === 'true';
  
  if (isAdmin) {
    // Change entry point for admin build
    config.entry = path.resolve(__dirname, 'src/index-admin.js');
    
    // Change HTML template for admin
    const htmlPlugin = config.plugins.find(
      plugin => plugin.constructor.name === 'HtmlWebpackPlugin'
    );
    if (htmlPlugin) {
      htmlPlugin.options.template = path.resolve(__dirname, 'public/admin.html');
      htmlPlugin.options.title = 'Detagenix Admin Panel';
    }
    
    // Change output for admin
    config.output.path = path.resolve(__dirname, 'build-admin');
  }
  
  return config;
};
