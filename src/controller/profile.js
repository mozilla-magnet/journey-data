class Profile {
  constructor(storage) {
    this._storage = storage;
  }

  get({ id }) {
    return this._storage.fetchProfile(id);
  }
}

module.exports = Profile;
