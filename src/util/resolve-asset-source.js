let resolveAssetSource;

try {
  resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');
} catch(e) {
  resolveAssetSource = function(source) {
    // TODO: Resolve to a static file endpoint on this server
    return 'https://example.com';
  };
}

module.exports = resolveAssetSource;
