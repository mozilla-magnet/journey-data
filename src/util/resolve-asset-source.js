let resolveAsset;
try {
  const resolveAssetSource =  require('react-native/Libraries/Image/resolveAssetSource');

  resolveAsset = function(path) {
    return resolveAssetSource(require(path));
  };

} catch(e) {
  resolveAsset = function(path) {
    return { uri: path };
  };
}

module.exports = resolveAsset;
