const createModel = require('../../util/model-create');
const Event = require('../../model/event');
const uuidv4 = require('uuid/v4');

module.exports = function(knex) {

  function logEvents(events) {
    const placeholders = events.map(() => '( ?, ?, ?, ?, ? )').join(', ');

    const eventDBEntries = events.reduce((acc, event) => {
      return acc.concat([
        event.uuid,
        event.timestamp || null,
        event.index_key || null,
        event.type,
        event.data
      ]);
    }, []);

    return knex.raw(`
        INSERT INTO "event"
        ("uuid", "timestamp", "index_key", "type", "data")
        VALUES ${placeholders}
        ON CONFLICT DO NOTHING
        RETURNING uuid
      `, eventDBEntries);
  }

  return {
    logEvents,
  };
};
