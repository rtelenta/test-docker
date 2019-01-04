const {defaultInjectConfig, rewireWorkboxInject} = require('react-app-rewire-workbox');
const rewireSvgSpriteLoader = require("react-app-rewired-svg-sprite-loader");
const rewireSass = require('react-app-rewire-scss');
const rewireDefinePlugin = require('react-app-rewire-define-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

module.exports = function override(config, env) {
  if (env === "production") {
    console.log("Generating Service Worker")

    const workboxConfig = {
      ...defaultInjectConfig,
      swSrc: path.join(__dirname, 'src', 'service-worker.js')
    }

    config = removeSWPrecachePlugin(config)
    config = rewireWorkboxInject(workboxConfig)(config, env)
  }

  const sassOptions = {
    "includePaths": [
      require('path').resolve(__dirname, 'node_modules')
    ]
  };

  function removeSWPrecachePlugin (config) {
    const swPrecachePluginIndex = config.plugins.findIndex((element) => {
      return element.constructor.name === 'SWPrecacheWebpackPlugin'
    })
    if (swPrecachePluginIndex !== -1) {
      config.plugins.splice(swPrecachePluginIndex, 1)
    }
    return config
  }
  // Get the root path (assuming your webpack config is in the root of your project!)
  const currentPath = path.join(__dirname, 'environments');
  
  // Create the fallback path (the production .env)
  const basePath = currentPath + '/.env';

  // We're concatenating the environment name to our filename to specify the correct env file!
  const envPath = basePath + '.' + process.env.ENVIRONMENT;

  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});
  

  config = rewireDefinePlugin(config, env, envKeys);

  config = rewireSass.withLoaderOptions(sassOptions)(config, env);
  config = rewireSvgSpriteLoader(config, env);

  config.plugins.push(new CopyWebpackPlugin([{from: `src/firebase-messaging-sw.${process.env.ENVIRONMENT}.js`, to: 'firebase-messaging-sw.js'}])
  );
  
  return config;
}