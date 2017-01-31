const connectionConfig = require('./knexfile');
const path = require('path');
const knex = require('knex');
const storiesDb = require('./stories');
const eventDb = require('./event');
const Story = require('../../model/story');
const MapReducer = require('../../util/map-reduce');

class PostgresStorage {
  constructor() {
    this._connection = knex(connectionConfig);
    const ready = this._connection.migrate.latest({
      directory: path.join(__dirname, 'migrations')
    })

    this._dbObjects = ready.then(() => {
      return {
        story: storiesDb(this._connection),
        event: eventDb(this._connection),
        knex: this._connection
      };
    });
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

  fetchPopularStoriesInLocation(currentLocation, radius, limit) {
    return this._dbObjects
      .then(({ story }) => {
        return story.getClosestPopularStories(currentLocation, radius, limit);
      });
  }

  fetchStories(limit) { return []; }
  fetchEvents() { return []; }

  logEvents(events) {
    return this._dbObjects
      .then(({ event }) => {
        return event.logEvents(events);
      })
      .then((result) => {
        const updatedUuids = result.rows.map(updatedRow => updatedRow.uuid);
        const newEvents = events.filter((event) => updatedUuids.includes(event.uuid));
        return newEvents;
      })

      // These two clauses aren't directly related to logging events, it's a
      // side effect of the logs, it computes new visits based on the updated
      // logs and updates the visit count in the story table
      .then((newEvents) => {
        const computedVisits = new MapReducer(newEvents, Story.computedViews.visits);
        const updatedVisits = computedVisits.map().reduce();
        return updatedVisits;
      })
      .then((updatedVisits) => {
        // The following code implements an Array.reduce style
        // reduction over the Map iterator, using a Promise as the
        // initial value.
        let reduce = Promise.resolve();
        for (const [key, val] of updatedVisits) {
          reduce = reduce.then(() => {
            return this._updateVisits(key, val);
          });
        }

        return reduce;
      });
  }

  _updateVisits(id, newVisits) {
    return this._dbObjects
      .then(({ knex } ) => {
        return knex('story')
          .where('id', '=', id)
          .increment('visits', newVisits);
      });
  }

  hasVisitedStory(story) { return false; }
}

module.exports = PostgresStorage;
