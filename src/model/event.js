class Event {}

Event.schema = {
  name: 'Event',
  properties: {
    uuid: 'string',
    timestamp: 'int',
    data: 'string'
  }
};

module.exports = Event;
