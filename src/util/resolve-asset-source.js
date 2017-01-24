let resolveAsset;
try {
  const resolveAssetSource =  require('react-native/Libraries/Image/resolveAssetSource');
  resolveAsset = resolveAssetSource;
} catch(e) {
  resolveAsset = function(path) {
    return { uri: path };
  };
}

module.exports = resolveAsset;
