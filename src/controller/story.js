class Story {
  constructor(storage) {
    this._storage = storage;
  }

  get({ story }) {
    return this._storage.fetchStory(story.id);
  }
}

module.exports = Story;
