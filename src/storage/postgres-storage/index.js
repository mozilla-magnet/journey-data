const connectionConfig = require('./knexfile');
const path = require('path');
const knex = require('knex');
const storiesDb = require('./stories');


class PostgresStorage {
  constructor() {
    this._connection = knex(connectionConfig);
    const ready = this._connection.migrate.latest({
      directory: path.join(__dirname, 'migrations')
    })

    this._dbObjects = ready.then(() => {
      return {
        story: storiesDb(this._connection),
      };
    });
    ;

  }

  fetchNewestStories(limit = 100) {
    return this._dbObjects
      .then(({ story }) => {
        return story.getNewestStories(limit);
      });
  }

  fetchStory(id) {
    return this._dbObjects
      .then(({ story }) => {
        return story.getStory(id);
      });
  }

  fetchNearestStories(currentLocation, radius, limit) {
    return this._dbObjects
      .then(({ story }) => {
        return story.getClosestStories(currentLocation, radius, limit);
      });
  }

  fetchPopularStoriesInLocation(currentLocation, radius, limit) { return []; }
  fetchStories(limit) { return []; }
  fetchEvents() { return []; }
  logEvent(event) {}
  hasVisitedStory(story) { return false; }
}

module.exports = PostgresStorage;
