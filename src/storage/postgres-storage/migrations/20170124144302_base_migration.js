exports.up = function(knex, Promise) {
  const createUserTable  = `
    CREATE TABLE "user" (
      id        SERIAL PRIMARY KEY,
      name      TEXT NOT NULL,
      image_uri TEXT,
      short_bio TEXT
    );
  `;

  const createStoryTable = `
    CREATE TABLE story (
      id                 SERIAL PRIMARY KEY,
      created_by_user_id INTEGER REFERENCES "user"(id),
      time_created       BIGINT DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP(3)) * 1000,
      title              TEXT NOT NULL,
      description        TEXT,
      location           GEOGRAPHY(POINT, 4326),
      image_uri          TEXT,
      audio_uri          TEXT,
      visits             BIGINT DEFAULT 0,
      call_to_action     JSON NOT NULL
    );
  `;

  const createStoryLocationIndex = `
    CREATE INDEX story_location_index ON story USING gist (location);
  `;

  const createEventTable = `
    CREATE TABLE event (
      uuid      UUID UNIQUE NOT NULL,
      timestamp BIGINT DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP(3)) * 1000,
      index_key TEXT,
      type      TEXT,
      data      JSONB NOT NULL
    );
  `;

  const createIndexKeyIndex = `
    CREATE INDEX event_key_index ON event(index_key);
  `;

  const createBrinIndexTimestamp = `
    CREATE INDEX event_time_index ON event USING brin (timestamp);
  `;

  const createViewCacheTable = `
    CREATE TABLE view_cache (
      view_id          TEXT NOT NULL PRIMARY KEY,
      key              TEXT,
      serialized_value TEXT,
      last_updated_uuid UUID
    );
  `;

  return Promise.resolve(knex.raw(createUserTable)
    .then(() => {
      return knex.raw(createStoryTable)
    })
    .then(() => {
      return knex.raw(createStoryLocationIndex);
    })
    .then(() => {
      return knex.raw(createEventTable);
    })
    .then(() => {
      return knex.raw(createIndexKeyIndex);
    }))
    .then(() => {
      return knex.raw(createBrinIndexTimestamp);
    })
    .then(() => {
      return knex.raw(createViewCacheTable);
    });
};

exports.down = function(knex, Promise) {
};
