const createModel = require('../../util/model-create');
const Story = require('../../model/story');
const User = require('../../model/user');
const { NotFoundError } = require('../../util/errors');

module.exports = function(knex) {
  const st = require('knex-postgis')(knex);

  function mapFromDbResponseToModel(obj) {
    const location = JSON.parse(obj.location);
    return createModel(Story, {
      id: obj.id,
      url: '?',
      createdByUser: createModel(User, {
        id: obj.created_by_user_id,
      }),
      timeCreated: obj.time_created,
      title: obj.title,
      description: obj.description,
      latitude: location.coordinates[0],
      longitude: location.coordinates[1],
      imageUri: obj.image_uri,
      audioUri: obj.audio_uri,
      fetchedTime: Date.now()
    });
  }

  function selectStory() {
    return knex('story')
      .select(
        'id', 'time_created', 'title', 'description',
        'created_by_user_id',
        st.asGeoJSON('location'), 'image_uri', 'audio_uri',
        'call_to_action');
  }

  function getStory(id) {
    return selectStory()
      .limit(1)
      .where('id', id)
      .then(response => response.map(mapFromDbResponseToModel))
      .then(response => {
        if (response.length > 0) {
          return response[0];
        }

        throw new NotFoundError(`Could not find story with id: '${id}'`);
      });
  }

  function getVisitCount(storyId) {
    return knex('event')
      .select('count')
      .whereRaw('data = \'{"type":"VISIT_STORY","storyId": ?}\'', storyId);
  }

  function getNewestStories(limit = 100) {
    return selectStory()
      .limit(limit)
      .orderBy('time_created', 'desc')
      .then(response => response.map(mapFromDbResponseToModel));
  }

  function getClosestStories(location, radius, limit = 100) {
    return selectStory()
      .where(
        st.dwithin(
          'location',
          st.makePoint(location.longitude, location.latitude),
          radius
        ))
      .limit(limit)
      .then(response => response.map(mapFromDbResponseToModel));
  }

  function getClosestPopularStories(location, radius, limit = 100) {
    return selectStory()
      .where(
        st.dwithin(
          'location',
          st.makePoint(location.longitude, location.latitude),
          radius
        ))
      .orderBy('visits', 'desc')
      .limit(limit)
      .then(response => response.map(mapFromDbResponseToModel));
  }

  return {
    getNewestStories,
    getClosestStories,
    getClosestPopularStories,
    getStory,
    getVisitCount,
  };
};
