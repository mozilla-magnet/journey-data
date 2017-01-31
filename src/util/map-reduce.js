module.exports = class MapReducer {

  constructor(iterable, computedView) {
    console.log(arguments);
    this.dataSource = iterable;

    this._mapFn = computedView.map;
    this._reducerFn = computedView.reduce;

    this.cachedMap = new Map();
  }

  map() {
    for (const record of this.dataSource) {
      const keyVals = this._mapFn(record);

      if (Array.isArray(keyVals)) {
        for (const { key, val } of keyVals) {
          if (this.cachedMap.has(key)) {
            this.cachedMap.get(key).push(val);
          } else {
            this.cachedMap.set(key, [ val ]);
          }
        }
      } else if (keyVals && keyVals.key) {
        const { key, val } = keyVals;
        this.cachedMap.set(key, [ val ]);
      }

      // Ignore if mapFn doesn't respond with an array of key vals, or a key val
      // object
    }

    return this;
  }

  reduce() {
    const results = new Map();

    for (const [k, vs] of this.cachedMap) {
      const { key, val } = this._reducerFn(k, vs);
      results.set(key, val);
    }

    return results;
  }

  continue(newData) {
    this.dataSource = newData;
    return this.map().reduce();
  }
}
