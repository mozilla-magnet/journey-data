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

module.exports = Story;
