const Realm = require('realm');
const { Story, User, Event }  = require('../model');
const uuidv4 = require('uuid/v4');

class RealmStorage {
  constructor() {
    this._realm = new Realm({ schema: [ Story.schema, User.schema, Event.schema ] });
  }

  fetchStory(id) {
    return this._realm.objects('Story').filtered(`id == ${Number(id)}`)[0];
  }

  fetchNewestStories(limit) {
    return this.fetchStories(limit).sorted('timeCreated');
  }

  fetchNearestStories(currentLocation, radius, limit) {
    return this.fetchStories(limit);
  }

  fetchPopularStoriesInLocation(currentLocation, radius, limit) {
    return
      this.fetchNearestStories(currentLocation, radius, limit)
          .sorted('visits');
  }

  fetchStories(limit) {
    return this._realm.objects('Story');
  }

  syncNearbyStoriesFromApi(position, radius) {
    // Dummy
    this._realm.write(() => {
      this._realm.create('Story', {
        id: 1,
        url: 'https://example.com/url',
        createdByUser: {
          userId: 1,
          url: 'userurl.com',
          name: 'Dan Kitchener',
          imageUri: '',
          shortBio: '',
        },
        title: 'Cool Story',
        description: 'Cool Description',
        visits: 901,
        latitude: 51.5086288,
        longitude: -0.1004596,
        imageUri: '',
        audioUri: '',
        fetchedTime: Date.now(),
      }, true);
    });
  }

  hasVisitedStory() {
    fetchEvents();
  }

  fetchEvents() {
    return this._realm.objects('Event');
  }

  logEvent(event) {
    const uuid = uuidv4();
    const timestamp = Date.now();

    this._realm.write(() => {
      // Log an event - to be synced up to the server, and then updated the
      // local state so we don't need to recompute values on the client
      this._realm.create('Event', {
        uuid,
        timestamp,
        data: JSON.stringify(event)
      });

      switch(event.type) {
        case 'VISIT_STORY':
          this._realm.create('Story', { id: event.storyId, visited: true }, true);
        case 'UNVISIT_STORY':
          this._realm.create('Story', { id: event.storyId, visited: false }, true);
        case 'LIKE_STORY':
          this._realm.create('Story', { id: event.storyId, liked: true }, true);
        case 'UNLIKE_STORY':
          this._realm.create('Story', { id: event.storyId, liked: false }, true);
      }
    });
  }
}

module.exports = RealmStorage;
