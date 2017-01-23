class User {
}

User.schema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: 'int',
    url: 'string',
    name: 'string',
    imageUri: 'string',
    shortBio: 'string'
  }
};

module.exports = User;
