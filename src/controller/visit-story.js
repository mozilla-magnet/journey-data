class VisitStory {
  constructor(storage) {
    this._storage = storage;
  }

  post(story) {
    this._storage.logEvent({
      type: 'VISIT_STORY',
      storyId: story.id,
    });
  }

  delete(story) {
    this._story.logEvent({
      type: 'UNVISIT_STORY',
      storyId: story.id,
    });
  }
}

module.exports = VisitStory;
