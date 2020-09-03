var configValue = require("./config.json");
module.exports = {
  getDbConnectionString: function () {
    return `mongodb://${configValue.username}:${configValue.password}@localhost:27017/FirstProject?authSource=admin`;
  },
};
