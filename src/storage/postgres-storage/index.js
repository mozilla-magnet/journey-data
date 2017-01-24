const connectionConfig = require('./knexfile');
const knex = require('knex')(connectionConfig);
const path = require('path');

class PostgresStorage {
  constructor() {
    this._ready = knex.migrate.latest({
      directory: path.join(__dirname, 'migrations')
    });
  }

  fetchNewestStories(limit) { return []; }
  fetchNearestStories(currentLocation, radius, limit) { return []; }
  fetchPopularStoriesInLocation(currentLocation, radius, limit) { return []; }
  fetchStories(limit) { return []; }
  fetchEvents() { return []; }
  logEvent(event) {}
  hasVisitedStory(story) { return false; }
}

module.exports = PostgresStorage;

