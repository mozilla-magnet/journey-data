const Event = require('./event');
class Story {}

Story.schema = {
  name: 'Story',
  primaryKey: 'id',
  properties: {
    id: 'int',
    url: 'string',
    createdByUser: 'User',
    timeCreated: 'int',
    title: 'string',
    description: 'string',
    visits: 'int',
    latitude: 'float',
    longitude: 'float',
    imageUri: 'string',
    audioUri: 'string',
    fetchedTime: 'int',
    liked: 'bool',
    visited: 'bool'
  }
};

Story.computedViews = {
  visits: {
    map: function(record) {
      console.log(record);
      if (record.type === Event.type.VISIT_STORY && record.data && record.data.storyId) {
        return { key: record.data.storyId, val: 1 };
      }
    },
    reduce: function(key, values) {
      return {
        key,
        val: values.reduce((acc, val) => acc + val) };
    }
  }
};

module.exports = Story;
