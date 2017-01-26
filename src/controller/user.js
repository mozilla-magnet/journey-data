class User {
  constructor(storage) {
    this._storage = storage;
  }

  get({ id }) {
    return this._storage.fetchUser(id);
  }
}

module.exports = User;
