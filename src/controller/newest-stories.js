class NewestStories {
  constructor(storage) {
    this._storage = storage;
  }

  get(parameters) {
    return this._storage.fetchNewestStories();
  }
}

module.exports = NewestStories;
