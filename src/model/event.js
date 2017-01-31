class Event {}

Event.schema = {
  name: 'Event',
  properties: {
    uuid: 'string',
    timestamp: 'int',
    type: 'string',
    data: 'string'
  }
};

Event.type = {
  VISIT_STORY: 'VISIT_STORY',
  UNVISIT_STORY: 'UNVISIT_STORY',
  STAR_STORY: 'STAR_STORY',
  UNSTAR_STORY: 'UNSTAR_STORY',
};

module.exports = Event;
