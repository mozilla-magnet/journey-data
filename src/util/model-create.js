function createModel(constructor, object) {
  const newObject = new constructor();

  Object.keys(constructor.schema.properties).reduce((obj, property) => {
    obj[property] = object[property];
    return obj;
  }, newObject);

  return newObject;
}

module.exports = createModel;
