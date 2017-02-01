class User {
}

User.schema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: 'int',
    ftu: { type: 'bool', default: true },
  }
};

module.exports = User;
