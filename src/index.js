'use strict';

const controllers = require('./controller');

class JourneyData {

  constructor(storageDriver) {
    this._storage = storageDriver;

    this._apiMethods = [];

    // Build API methods
    Object.keys(controllers).reduce((apiObject, controller) => {
      const apiController = new controllers[controller](storageDriver);

      if (apiController.get) {
        const name = `get${controller}`;
        this._apiMethods.push(name);
        apiObject[name] = apiController.get.bind(apiController);
      }

      if (apiController.post) {
        const name = controller.charAt(0).toLowerCase() + controller.slice(1);
        this._apiMethods.push(name);
        apiObject[name] = apiController.post.bind(apiController);
      }

      if (apiController.delete) {
        const name = `delete${controller}`;
        this._apiMethods.push(name);
        apiObject[name] = apiController.delete.bind(apiController);
      }

      return apiObject;
    }, this);
  }

  listApiMethods() {
    return this._apiMethods;
  }
}

module.exports = {
  JourneyData
};
