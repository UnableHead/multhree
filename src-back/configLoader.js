const path = require("path");
const fs = require("fs");

const configFilePath = path.resolve(__dirname + "/config.json");
let cfgData = {};

try {
  const file = fs.readFileSync(configFilePath);
  cfgData = JSON.parse(file);
}catch(err){
  console.log("No config file found in :", configFilePath, "default config loaded");
  // Set default config for dev environment
  cfgData = {
    serverPort: 8090,
    serverFolder: "../../Meteo_Services/build"
  };
}

module.exports = cfgData;