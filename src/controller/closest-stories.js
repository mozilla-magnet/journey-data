class ClosestStories {
  constructor(storage) {
    this._storage = storage;
  }

  get({ currentLocation, radius }) {
    return this._storage.fetchNearestStories(currentLocation, radius);
  }
}

module.exports = ClosestStories;
