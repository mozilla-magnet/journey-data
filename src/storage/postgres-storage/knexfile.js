module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/journey-service',
  pool: { min: 1, max: 10 },
  acquireConnectionTimeout: 5000
};
