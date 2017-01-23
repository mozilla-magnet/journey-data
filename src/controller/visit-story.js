class VisitStory {
  constructor(storage) {
    this._storage = storage;
  }

  get(story) {
    return this._storage.getVisitedStory(story);
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
