let Realm;

try {
  Realm = require('realm');
} catch(e) {
  console.log('Realm not installed... RealmStorage unavailable');
  Realm = function() { throw new Error('Realm not installed (npm install --save realm)'); };
}

const { Story, User, Event }  = require('../model');
const uuidv4 = require('uuid/v4');

class RealmStorage {
  constructor() {
    this._realm = new Realm({ schema: [ Story.schema, User.schema, Event.schema ] });
  }

  fetchStory(id) {
    return Promise.resolve(this._realm.objects('Story').filtered(`id == ${Number(id)}`)[0]);
  }

  fetchNewestStories(limit) {
    return this.fetchStories(limit).then(results => results.sorted('timeCreated'));
  }

  fetchNearestStories(currentLocation, radius, limit) {
    return this.fetchStories(limit);
  }

  fetchPopularStoriesInLocation(currentLocation, radius, limit) {
    return this.fetchNearestStories(currentLocation, radius, limit)
        .then(results => results.sorted('visits'));
  }

  fetchStories(limit) {
    return Promise.resolve(this._realm.objects('Story'));
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

  fetchEvents() {
    return this._realm.objects('Event');
  }

  logEvents(events) {
    this._realm.write(() => {
      events.forEach((event) => {
        // Log an event - to be synced up to the server, and then updated the
        // local state so we don't need to recompute values on the client
        this._realm.create('Event', event);

        switch(event.data.type) {
          case Event.type.VISIT_STORY:
            this._realm.create('Story', { id: event.storyId, visited: true }, true);
            return;
          case Event.type.START_STORY:
            this._realm.create('Story', { id: event.storyId, starred: true }, true);
            return;
          case Event.type.UNSTAR_STORY:
            this._realm.create('Story', { id: event.storyId, starred: false }, true);
            return;
        }
      });
    });
  }
}

module.exports = RealmStorage;
