const SectionModel = require("./model");

module.exports = {
  find: async data => {
    return {
      message: "find section called"
    };
  },
  create: async data => {
    return {
      message: "create section called"
    };
  },
  update: async data => {
    return {
      message: "update section called"
    };
  },
  delete: async data => {
    return {
      message: "delete section called"
    };
  }
};
