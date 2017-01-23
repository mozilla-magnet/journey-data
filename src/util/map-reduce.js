module.exports = class MapReducer {

  constructor(iterable, mapFn, reduceFn) {
    this.dataSource = iterable;

    this._mapFn = mapFn;
    this._reducerFn = reduceFn;

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
      } else {
        const { key, val } = keyVals;
        this.cachedMap.set(key, [ val ]);
      }
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
