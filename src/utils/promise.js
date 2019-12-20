Array.prototype.forEachAsync = async function(callback, thisArg) {
  for (let [index, item] of Object.entries(this)) {
    await callback(item, index, this);
  }
};

export async function _promiseAll(requestArr) {
  if (requestArr.length === 0) return;
  if (
    !requestArr.every(req => {
      return req instanceof Promise;
    })
  ) {
    return new Error('contain not instanceof Promise unit');
  }
  let results = [];

  await requestArr.forEachAsync(async req => {
    const [data, error] = await req.then(res => [res, null]).catch(err => [null, err]);
    results.push([data, error]);
  });

  return results;
}
