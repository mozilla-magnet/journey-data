'use strict';

const controllers = require('./controller');

class Journey {

  constructor(storageDriver) {
    this._storage = storageDriver;

    // Build API methods
    Object.keys(controllers).reduce((apiObject, controller) => {
      console.log(controller);
      const apiController = new controllers[controller](storageDriver);

      if (apiController.get) {
        const name = `get${controller}`;
        apiObject[name] = apiController.get.bind(apiController);
      }

      if (apiController.post) {
        const name = controller.charAt(0).toLowerCase() + controller.slice(1);
        apiObject[name] = apiController.post.bind(apiController);
      }

      if (apiController.delete) {
        const name = `delete${controller}`;
        apiObject[name] = apiController.delete.bind(apiController);
      }

      return apiObject;
    }, this);
  }
}

module.exports = Journey;
