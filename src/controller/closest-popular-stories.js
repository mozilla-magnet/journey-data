class ClosestPopularStories {
  constructor(storage) {
    this._storage = storage;
  }

  get(parameters = {}) {
    const currentLocation = parameters.currentLocation;
    const radius = parameters.radius;

    if (!(currentLocation && radius)) {
      throw new Error('Invalid arguments: Must have `{ currentLocation: [ <lat>, <long> ], radius: <int> }`');
    }

    return this._storage
      .fetchPopularStoriesInLocation(currentLocation, radius);
  }
}

module.exports = ClosestPopularStories;
