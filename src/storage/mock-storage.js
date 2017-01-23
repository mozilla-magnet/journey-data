const resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');
const createModel = require('../util/model-create');
const { Story, User } = require('../model');

class MockStorage {
  fetchNewestStories(limit) {
    return this.fetchStories();
  }

  fetchNearestStories(currentLocation, radius, limit) {
    return this.fetchStories();
  }

  fetchPopularStoriesInLocation(currentLocation, radius, limit) {
    return this.fetchStories();
  }

  fetchStories(limit) {
    return [
      createModel(Story, {
        id: 1,
        url: '',
        createdByUser: createModel(User, {
          id: 1,
          name: 'Dan Kitchener',
          imageUri: '',
          shortBio: 'A street art curator'
        }),
        timeCreated: 1485185482,
        title: 'Piece #1',
        description: '',
        visits: 290,
        latitude: 51.5087624,
        longitude: -0.1011677,
        imageUri: resolveAssetSource(require('../mockdata/images/dank.jpg')),
        audioUri: '',
        fetchedTime: Date.now(),
        liked: false,
        visited: false,
      })
    ];
  }

  fetchEvents() { return []; }
  logEvent(event) {}
}
