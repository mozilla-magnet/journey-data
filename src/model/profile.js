class Profile {
}

Profile.schema = {
  name: 'Profile',
  primaryKey: 'id',
  properties: {
    id: 'int',
    url: 'string',
    name: 'string',
    imageUri: 'string',
    shortBio: 'string',
  },
};

module.exports = Profile;
