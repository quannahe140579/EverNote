var configValue = require("./config.json");
module.exports = {
  getDbConnectionString: function () {
    return (
      "mongodb://root:example@localhost:27017/FirstProject?authSource=admin"
    );
  },
};
