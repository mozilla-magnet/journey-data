class LikeStory {
  constructor(storage) {
    this._storage = storage;
  }

  post({ story }) {
    this._storage.logEvent({
      type: 'LIKE_STORY',
      storyId: story.id
    });
  }

  delete({ story }) {
    this._storage.logEvent({
      type: 'UNLIKE_STORY',
      storyId: story.id
    });
  }
}

module.exports = LikeStory;
