const connectionConfig = require('./knexfile');
const path = require('path');

let knex;
try {
  knex = require('knex');
} catch(e) {
  knex = function() { throw new Error('Knex not installed as peer dependency'); };
}

class PostgresStorage {
  constructor() {
    this._connection = knex(connectionConfig);
    this._ready = this._connection.migrate.latest({
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

