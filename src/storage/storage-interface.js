class StorageInterface {
  fetchNewestStories(limit) { return []; }
  fetchNearestStories(currentLocation, radius, limit) { return []; }
  fetchPopularStoriesInLocation(currentLocation, radius, limit) { return []; }
  fetchStories(limit) { return []; }
  fetchEvents() { return []; }
  logEvents(event) {}
  hasVisitedStory(story) { return false; }
  fetchStory(id) { return false };
  fetchUser(id) { return false };
}

module.exports = StorageInterface;
