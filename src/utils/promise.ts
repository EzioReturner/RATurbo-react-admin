Object.setPrototypeOf(Array, {
  ...Array.prototype,
  forEachAsync: async function(callback: Function, thisArg: any) {
    for (let [index, item] of Object.entries(this)) {
      await callback(item, index, this);
    }
  }
});
// // @ts-ignore
// Array.prototype.forEachAsync = async function(callback: Function, thisArg) {
//   for (let [index, item] of Object.entries(this)) {
//     await callback(item, index, this);
//   }
// };

export async function _promiseAll(requestArr: Promise<any>[]) {
  if (requestArr.length === 0) return;
  if (
    !requestArr.every(req => {
      return req instanceof Promise;
    })
  ) {
    return new Error('contain not instanceof Promise unit');
  }
  let results: any = [];

  // @ts-ignore
  await requestArr.forEachAsync(async (req: Promise<any>) => {
    const [data, error] = await req.then(res => [res, null]).catch(err => [null, err]);
    results.push([data, error]);
  });

  return results;
}
