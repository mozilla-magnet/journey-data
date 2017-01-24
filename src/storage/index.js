const storageModules = {
  MockStorage: function() { return require('./mock-storage'); },
  RealmStorage: function() { return require('./realm-storage'); },
  PostgresStorage: function() { return require('./postgres-storage'); }
};

module.exports = function createStorage(storageModule) {
  const constructor = storageModules[storageModule]();
  return new constructor();
};
