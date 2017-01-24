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
      call_to_action     JSON NOT NULL
    );
  `;

  const createStoryLocationIndex = `
    CREATE INDEX story_location_index ON story USING gist (location);
  `;

  const createEventTable = `
    CREATE TABLE event (
      uuid      UUID NOT NULL,
      timestamp TIMESTAMP WITHOUT TIME ZONE
                  DEFAULT (now() AT TIME ZONE 'utc'),
      index_key TEXT,
      data      JSONB NOT NULL
    );
  `;

  const createIndexKeyIndex = `
    CREATE INDEX event_key_index ON event(index_key);
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
    }));
};

exports.down = function(knex, Promise) {
};
