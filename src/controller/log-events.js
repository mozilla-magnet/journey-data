const createModel = require('../util/model-create');
const Event = require('../model/event');
const Story = require('../model/story');
const uuidv4 = require('uuid/v4');

class LogEvents {
  constructor(storage) {
    this._storage = storage;
  }

  post(events) {
    if (!Array.isArray(events)) {
      throw new Error('Argument `events` should be an Array');
    }

    const eventModels = events.map(createEvent);

    return this._storage
      .logEvents(eventModels);
  }
}

function createEvent(event) {
  const uuid = event.uuid || uuidv4();
  const timestamp = event.timestamp || Date.now();
  const type = event.type;

  const data = Object.assign({}, event);
  delete data.timestamp;
  delete data.uuid;
  delete data.type;

  return createModel(Event, Object.assign({}, {
    uuid,
    timestamp,
    type,
    data,
  }));
}

module.exports = LogEvents;
