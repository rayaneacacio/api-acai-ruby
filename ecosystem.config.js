const path = require("path");

module.exports = {
  apps : [{
    name: "app",
    script: path.resolve("dist", "src", "server.js"),
    instances: "max",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}