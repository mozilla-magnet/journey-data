const resolveAssetSource = require('../util/resolve-asset-source');
const createModel = require('../util/model-create');
const { Story, User, Profile } = require('../model');

class MockStorage {
  fetchStory(id) {
    return this.fetchStories().then(stories => stories[id - 1]);
  }

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
    return this
      .fetchProfile(1)
      .then((creatorProfile) => {
        return [
          createModel(Story, {
            id: 1,
            url: '',
            createdByUser: creatorProfile,
            timeCreated: 1485185482,
            title: 'Piece #1',
            description: '',
            visits: 290,
            latitude: 51.5087624,
            longitude: -0.1011677,
            imageUri: resolveAssetSource(require('../mockdata/images/dank.jpg')).uri,
            audioUri: '',
            fetchedTime: Date.now(),
            liked: false,
            visited: false,
          }),
          createModel(Story, {
            id: 2,
            url: '',
            createdByUser: creatorProfile,
            timeCreated: 1485258799,
            title: 'Piece #2',
            description: '',
            visits: 10902,
            latitude: 51.5044484,
            longitude: -0.1056524,
            imageUri: resolveAssetSource(require('../mockdata/images/lowbros.jpg')).uri,
            audiUri: '',
            fetchedTime: Date.now(),
            liked: false,
            visited: false,
          }),
          createModel(Story, {
            id: 3,
            url: '',
            createdByUser: creatorProfile,
            timeCreated: 1485437665,
            title: 'Piece #3',
            description: '',
            visits: 10902,
            latitude: 51.525179,
            longitude: -0.0775077,
            imageUri: resolveAssetSource(require('../mockdata/images/stik.jpg')).uri,
            audiUri: '',
            fetchedTime: Date.now(),
            liked: false,
            visited: false,
          }),
        ];
      });
  }

  fetchUser(id) {
    return Promise.resolve(createModel(User, {
      id: id,
      ftu: true
    }));
  }

  fetchProfile(id) {
    return Promise.resolve(createModel(Profile, {
      id: id,
      name: 'Dan Kitchener',
      imageUri: resolveAssetSource(require('../mockdata/images/dan-kitchener.jpg')).uri,
      shortBio: 'A street art curator'
    }));
  }

  fetchEvents() {
    return [];
  }

  logEvent(event) {}
}

module.exports = MockStorage;
